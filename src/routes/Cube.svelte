<script lang="ts">
	import type { CubeSize } from "$lib";
	import { type Snippet } from "svelte";

    interface Props {
        children: Snippet,
        size: CubeSize
    };

    let { children, size }: Props = $props();

</script>

<div class="@container {size} aspect-square">
    <div class="relative grid grid-cols-3 gap-[1px] @cube_sm:gap-1 w-full h-full">
        <div class="absolute inset-2 bg-slate-900 shadow-lg shadow-black"></div>

        {@render children()}
    </div>
</div>