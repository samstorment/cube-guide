<script lang="ts">
	import { parseFirstInt } from "$lib";
	import { getContext, type Snippet } from "svelte";
	import type { ClassValue } from "svelte/elements";

    interface Props {
        color: string,
        top?: string,
        bottom?: string,
        left?: string,
        right?: string,
        class?: ClassValue,
        children?: Snippet
    }

    let props: Props = $props();

    const recolor = (color?: string) => {
        if (!color) return color;
        return color === "orange" ? "#ff6c00" : color;
    }

</script>

<div 
    class="relative z-10 border-3 @cube_sm:border-4 border-slate-950 rounded-sm shadow-sm {props.class}"
    style="background-color: {recolor(props.color)}; 
        border-top-color: {recolor(props.top)}; 
        border-left-color: {recolor(props.left)}; 
        border-right-color: {recolor(props.right)};
        border-bottom-color: {recolor(props.bottom)};"
>
    <div class="absolute text-sm inset-0 flex items-center justify-center font-bold" 
        class:text-slate-900="{props.color === 'white' || props.color === 'orange' || props.color === 'yellow'}"
    >
        {@render props.children?.()}
    </div>
</div>
