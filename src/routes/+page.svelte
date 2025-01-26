<script lang="ts">
	import { type CubeSize } from "$lib";
	import { onMount } from "svelte";
	import Cube from "./Cube.svelte";
	import Cubie from "./Cubie.svelte";
    import confetti from 'canvas-confetti';

    // Target element
    let youDidIt: HTMLElement;

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function launchConfetti() {
        let duration = 15 * 1000;
        let animationEnd = Date.now() + duration;
        let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        let interval = 0;

        clearInterval(interval);

        interval = setInterval(function() {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            let particleCount = 50 * (timeLeft / duration);

            confetti({ 
                ...defaults, 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
            });
            confetti({ 
                ...defaults, 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
            });
        }, 250);
    }

    onMount(() => {
        // Observer options
        const observerOptions = {
            root: null, // Observe in the viewport
            rootMargin: '0px',
            threshold: 0.5 // 50% of the element should be visible
        };
    
        // Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    launchConfetti();
                }
            });
        }, observerOptions);

        observer.observe(youDidIt);
    })


</script>


<div class="prose max-w-[80ch] dark:prose-invert p-4 mx-auto">
    <h2>The White Cross</h2>
    
    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end">
        <div class="flex-1">
            <p class="mb-4 text-balance">Solve the white cross by putting the 4 white edges next to the white center. The dimgray colors mean we don't care what color that piece is right now.</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="white" top="blue">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="white" left="orange">Edge</Cubie>
                <Cubie color="white">Center</Cubie>
                <Cubie color="white" right="red">Edge</Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="white" bottom="green">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">Each white cross piece should match to the corrseponding red, green, orange, and blue center pieces. With the white face facing up, the sides of the cube should look like this when this step is done.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render crossSideCenter("w-24", "green")}
                {@render crossSideCenter("w-24", "orange")}
                {@render crossSideCenter("w-24", "blue")}
                {@render crossSideCenter("w-24", "red")}
            </div>
        </div>
    </div>

    <h2>The White Corners</h2>

    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end mb-8">
        <div class="flex-1">
            <p class="mb-4 text-balance">Solve the white corners by putting the 4 white corners next to the white edges.</p>

            <Cube size="w-48">
                <Cubie color="white" top="blue" left="orange">Corner</Cubie>
                <Cubie color="white" top="blue"></Cubie>
                <Cubie color="white" top="blue" right="red">Corner</Cubie>
                
                <Cubie color="white" left="orange"></Cubie>
                <Cubie color="white"></Cubie>
                <Cubie color="white" right="red"></Cubie>
                
                <Cubie color="white"  bottom="green" left="orange">Corner</Cubie>
                <Cubie color="white" bottom="green"></Cubie>
                <Cubie color="white" bottom="green" right="red">Corner</Cubie>
            </Cube>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">With the white face facing up, the sides of the cube should look like this when this step is done.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render crossSideCorners("w-24", "green", "orange", "red")}
                {@render crossSideCorners("w-24", "orange", "blue", "green")}
                {@render crossSideCorners("w-24", "blue", "red", "orange")}
                {@render crossSideCorners("w-24", "red", "green", "blue")}
            </div>
        </div>
    </div>

    <p>To insert a corner piece, place it in the bottom layer of the cube with the white face of the corner piece on the right or left. Here's how to insert a corner piece using the {@render colors(['red', 'green', 'white'])} corner piece as an example.</p>

  
    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end">
        <div class="flex-1">
            <p class="text-sm mb-4 text-balance">
                White is on the right of the corner piece, so we match the {@render colors(['green'])} front of the corner piece diagonally to the {@render colors(['green'])} center.
            </p>

            <Cube size="w-48">
                <Cubie color="gray"></Cubie>
                <Cubie color="green" top="white"></Cubie>
                <Cubie color="gray"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="green">Center</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="green" right="white" bottom="red">Corner</Cubie>

                <div 
                    class="absolute border-2 border-dashed w-[2px] h-1/3 z-20 right-1/3 bottom-1/6 -rotate-45">
                </div>
            </Cube>

            <p class="text-sm mt-6 mb-2">
                Insert with:
            </p>

            {@render alg("R' D' R")}
            
        </div>

        <div class="flex-1">
            <p class="text-sm mb-4 text-balance">
                White is on the left of the corner piece, so we match the {@render colors(['red'])} front of the corner piece diagonally to the {@render colors(['red'])} center.
            </p>

            <Cube size="w-48">
                <Cubie color="gray"></Cubie>
                <Cubie color="red" top="white"></Cubie>
                <Cubie color="gray"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="red">Center</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="red" left="white" bottom="green">Corner</Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>

                <div 
                    class="absolute border-2 border-dashed w-[2px] h-1/3 z-20 left-1/3 bottom-1/6 rotate-45">
                </div>
            </Cube>

            <p class="text-sm mt-6 mb-2">
                Insert with:
            </p>

            {@render alg("L D L'")}
        </div>
    </div>

    <p>Use this same strategy for all four white corner pieces. If the corner piece isn't in the bottom layer with white on the left or right, just fiddle with those two algorithms above until they are and you'll get a feel for it.</p>

    <h2>The Middle Layer Edges</h2>


    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end mb-8">
        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">With the white face facing up, the sides of the cube should like this when this step is done.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render f2l("w-24", "green", "orange", "red")}
                {@render f2l("w-24", "orange", "blue", "green")}
                {@render f2l("w-24", "blue", "red", "orange")}
                {@render f2l("w-24", "red", "green", "blue")}
            </div>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">However, we're going to flip the cube so white is on bottom during for the rest of the solve, so things will look like this instead.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render f2l("w-24", "green", "orange", "red", true)}
                {@render f2l("w-24", "orange", "blue", "green", true)}
                {@render f2l("w-24", "blue", "red", "orange", true)}
                {@render f2l("w-24", "red", "green", "blue", true)}
            </div>
        </div>
    </div>

    <p>To insert a middle layer edge, get the edge into the top layer and match the front color of the edge to the same colored center. Here's how to insert an edge piece using the {@render colors(['green', 'orange'])} edge piece as an example.</p>

    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end">
        <div class="flex-1">
            <p class="text-sm mb-4 text-balance">
                {@render colors(['Green'])} is the front color of the edge and {@render colors(['orange'])} is on top of the edge so we match the {@render colors(['Green'])} edge to the {@render colors(['Green'])} center.
            </p>

            <Cube size="w-48">
              
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="green" top="orange">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="green">Center</Cubie>
                <Cubie color="dimgray"></Cubie>

                <Cubie color="green" bottom="white" left="red"></Cubie>
                <Cubie color="green" bottom="white"></Cubie>
                <Cubie color="green" bottom="white" right="orange"></Cubie>

                <div 
                    class="absolute border-2 border-dashed w-[2px] h-1/6 z-20 right-1/2 top-1/4">
                </div>
            </Cube>

            <p class="text-sm text-balance mt-6 mb-2">
                The {@render colors(['orange'])} center is to the right, so we insert the edge with:
            </p>

            {@render alg("U R U' R' U' F' U F")}
            
        </div>

        <div class="flex-1">
            <p class="text-sm mb-4 text-balance">
                {@render colors(['Orange'])} is the front color of the edge and {@render colors(['green'])} is on top of the edge so we match the {@render colors(['orange'])} edge to the {@render colors(['orange'])} center.
            </p>

            <Cube size="w-48">
              
                <Cubie color="dimgray"></Cubie>
                <Cubie color="orange" top="green">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="orange">Center</Cubie>
                <Cubie color="dimgray"></Cubie>

                <Cubie color="orange" bottom="white" left="green"></Cubie>
                <Cubie color="orange" bottom="white"></Cubie>
                <Cubie color="orange" bottom="white" right="blue"></Cubie>

                <div 
                    class="absolute border-2 border-dashed w-[2px] border-white h-1/6 z-20 right-1/2 top-1/4">
                </div>
            </Cube>

            <p class="text-sm text-balance mt-6 mb-2">
                The {@render colors(['green'])} center is to the left, so we insert the edge with:
            </p>

            {@render alg("U' L' U L U F U' F'")}
        </div>
    </div>

    <p>Use this same strategy for all four middle layer edges. If an edge isn't in the top layer, fiddle with those two algorithms until it is.</p>

    <h2>The Top Cross</h2>

    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end mb-8">
        <div class="flex-1">
            <p class="mb-4 text-balance text-sm">The next goal is to make the top yellow layer of the cube look like this. We're only concerned with edges here and don't care about corners yet.</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" top="blue">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow" left="red">Edge</Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="orange">Edge</Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" bottom="green">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">With the yellow face facing up, the sides of the cube should look like this when this step is done.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render topCrossSide("w-24", "green", "red", "orange")}
                {@render topCrossSide("w-24", "orange", "green", "blue")}
                {@render topCrossSide("w-24", "blue", "orange", "red")}
                {@render topCrossSide("w-24", "red", "blue", "green")}
            </div>
        </div>
    </div>

    <p>There are 4 possible ways your yellow face could look after completing the last step:</p>

    <ul class="not-prose grid grid-cols-1 md:grid-cols-2 gap-6">
        <li>
            <p class="text-sm mb-2">A Single Yellow Dot</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="dimgray"></Cubie>

                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </li>

        <li>
            <p class="text-sm mb-2">An L-Shape</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="dimgray"></Cubie>

                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </li>

        <li>
            <p class="text-sm mb-2">A Bar</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow"></Cubie>

                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </li>

        <li>
            <p class="text-sm mb-2">The Full Cross</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow"></Cubie>

                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </li>
    </ul>

    <p>If you have the Dot, L-Shape, or Bar, do the algorithm below, checking if you got a new shape, until you get the Full Cross. If you already have the Full Cross, you skipped this step! Nice! Note that the L-Shape <i>must</i> be in the top left corner as shown above and the bar <i>must</i> be horizontal as shown above.</p>

    {@render alg("F R U R' U' F'")}

    <p>Next you want to get the yellow edges touching their correct centers. You'll have at least two edges touching the correct center already. You'll probably need to rotate the top layer some to find them. Rotate the cube until you have two correct edges in the front and back of the top layer, or the right and back of the top layer. If all 4 edges are already correct, you skipped a step! Nice!</p>

    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end mb-8">
        <div class="flex-1">
            <p class="mb-4 text-balance text-sm">Front and back example: if the {@render colors(['green'])} and {@render colors(['blue'])} edges are both able to touch their correct center, your cube will look like this.</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" top="blue">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow" left="orange">Edge</Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="red">Edge</Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" bottom="green">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">And the sides will look like this. See how {@render colors(['blue'])} and {@render colors(['green'])}  are touching their center but {@render colors(['red'])} and {@render colors(['orange'])} are not.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render topCrossSide("w-24", "green", "red", "orange")}
                {@render topCrossSide("w-24", "orange", "green", "blue", "red")}
                {@render topCrossSide("w-24", "blue", "orange", "red")}
                {@render topCrossSide("w-24", "red", "blue", "green", "orange")}
            </div>
        </div>
    </div>

    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end mb-8">
        <div class="flex-1">
            <p class="mb-4 text-balance text-sm">Right and back example: if the {@render colors(['orange'])} and {@render colors(['blue'])} edges are both able to touch their correct center, your cube will look like this.</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" top="blue">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow" left="green">Edge</Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="orange">Edge</Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" bottom="red">Edge</Cubie>
                <Cubie color="dimgray"></Cubie>
            </Cube>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-sm text-balance">And the sides will look like this. See how {@render colors(['orange'])} and {@render colors(['blue'])} are touching their center but {@render colors(['red'])} and {@render colors(['green'])} are not.</p>

            <div class="grid grid-cols-2 gap-4 w-fit">
                {@render topCrossSide("w-24", "green", "red", "orange", "red")}
                {@render topCrossSide("w-24", "orange", "green", "blue")}
                {@render topCrossSide("w-24", "blue", "orange", "red")}
                {@render topCrossSide("w-24", "red", "blue", "green", "green")}
            </div>
        </div>
    </div>

    <p>You might not have those exact edge colors, but you will have 2 edge pieces that can mactch on the front/back or right/back. Hold the cube so the matching edges are on the front/back or right/back and do the algorithm below:</p>


    {@render alg("R U R' U R U2 R'")}


    <h2>The Top Corners</h2>

    <p>The goal is to get all 4 top corners on the yellow face into the correct slot, even if they're not flipped the right direction.</p>

    <div class="not-prose flex flex-col md:flex-row gap-8 md:items-end mb-8">
        <div class="flex-1">
            <p class="mb-4 text-balance text-sm">For example, the bottom right corner here is in the correct slot because it is the {@render colors(['yellow', 'green', 'orange'])} piece and it is next to the {@render colors(['yellow', 'green'])} and {@render colors(['yellow', 'orange'])} edge pieces.</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" top="blue"></Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow" left="red"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="orange"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" bottom="green"></Cubie>
                <Cubie color="green" right="yellow" bottom="orange">Good!</Cubie>
            </Cube>
        </div>

        <div class="flex-1">
            <p class="mb-4 text-balance text-sm">Here's the same piece flipped a different way and it's still correct because it is neighboring the pieces with the right colors.</p>

            <Cube size="w-48">
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" top="blue"></Cubie>
                <Cubie color="dimgray"></Cubie>
                
                <Cubie color="yellow" left="red"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="orange"></Cubie>
                
                <Cubie color="dimgray"></Cubie>
                <Cubie color="yellow" bottom="green"></Cubie>
                <Cubie color="orange" right="green" bottom="yellow">Good!</Cubie>
            </Cube>
        </div>
    </div>

    <p>Once you find any corner that is in the correct slot relative to its neighboring edges, put the corner in the bottom right of the top face as shown above and do the following algorithm:</p>

    {@render alg("U R U' L' U R' U' L")}

    <p>Repeat this algorithm, keeping the correctly slotted corner in the bottom right, until all 4 corners are in the correct slot. If no pieces are in the correct slot, do the algorithm above until you find one.</p>

    <h2>The Final Step</h2>

    <p>The final step is just repeating the same four move algorithm until the bottom right corner on the top face has yellow on top. Once it has yellow on top do {@render inlineAlg("U")} moves to get an unsolved corner into the bottom right, repeating the 4 move algorithm until yellow is on top for that corner. Once all 4 corners have yellow on top, your cube is solved!</p>

    <p>Here's the algorithm:</p>

    {@render alg("R' D' R D")}

    <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 md:items-end mb-8">
        <div>
            <p class="mb-4 text-balance text-sm">Assume the cube looks like this. We'd do {@render inlineAlg("R' D' R D")} 4 times until yellow is on top for the bottom right corner piece.</p>

            <Cube size="w-48">
                <Cubie color="blue" top="red" left="yellow"></Cubie>
                <Cubie color="yellow" top="blue"></Cubie>
                <Cubie color="blue" top="orange" right="yellow"></Cubie>
                
                <Cubie color="yellow" left="red"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="orange"></Cubie>
                
                <Cubie color="red" left="green" bottom="yellow"></Cubie>
                <Cubie color="yellow" bottom="green"></Cubie>
                <Cubie color="orange" right="green" bottom="yellow"></Cubie>
            </Cube>
        </div>

        <div>
            <p class="mb-4 text-balance text-sm">The cube now looks like this. The bottom right corner of the top face looks solved! Now let's do a {@render inlineAlg("U")} move to put the next unsolved corner in the bottom right.</p>

            <Cube size="w-48">
                <Cubie color="blue" top="red" left="yellow"></Cubie>
                <Cubie color="yellow" top="blue"></Cubie>
                <Cubie color="blue" top="orange" right="yellow"></Cubie>
                
                <Cubie color="yellow" left="red"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="orange"></Cubie>
                
                <Cubie color="red" left="green" bottom="yellow"></Cubie>
                <Cubie color="yellow" bottom="green"></Cubie>
                <Cubie color="yellow" right="orange" bottom="green"></Cubie>
            </Cube>
        </div>

        <div>
            <p class="mb-4 text-balance text-sm">The cube now looks like this. We do {@render inlineAlg("R' D' R D")} until yellow is on top again.</p>

            <Cube size="w-48">
                <Cubie color="red" top="green" left="yellow"></Cubie>
                <Cubie color="yellow" top="red"></Cubie>
                <Cubie color="blue" top="yellow" right="red"></Cubie>
                
                <Cubie color="yellow" left="green"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="blue"></Cubie>
                
                <Cubie color="yellow" left="green" bottom="orange"></Cubie>
                <Cubie color="yellow" bottom="orange"></Cubie>
                <Cubie color="blue" right="orange" bottom="yellow"></Cubie>
            </Cube>
        </div>

        <div>
            <p class="mb-4 text-balance text-sm">The cube now looks like this. The bottom right corner has yellow on top so do another {@render inlineAlg("U")} to put the next unsolved piece in the bottom right.</p>

            <Cube size="w-48">
                <Cubie color="red" top="green" left="yellow"></Cubie>
                <Cubie color="yellow" top="red"></Cubie>
                <Cubie color="blue" top="yellow" right="red"></Cubie>
                
                <Cubie color="yellow" left="green"></Cubie>
                <Cubie color="yellow"></Cubie>
                <Cubie color="yellow" right="blue"></Cubie>
                
                <Cubie color="yellow" left="green" bottom="orange"></Cubie>
                <Cubie color="yellow" bottom="orange"></Cubie>
                <Cubie color="yellow" right="blue" bottom="orange"></Cubie>
            </Cube>
        </div>
    </div>

    <p>Keep repeating these steps until the cube is solved!</p>
</div>


<footer class="text-zinc-100 text-3xl h-screen flex items-center justify-center">
    <p bind:this={youDidIt}>You did it!</p>
</footer>


{#snippet crossSideCenter(size: CubeSize, color: string)}
    <Cube {size}>
        <Cubie color="dimgray"></Cubie>
        <Cubie {color} top="white"></Cubie>
        <Cubie color="dimgray"></Cubie>
        
        <Cubie color="dimgray"></Cubie>
        <Cubie {color}></Cubie>
        <Cubie color="dimgray"></Cubie>
        
        <Cubie color="dimgray"></Cubie>
        <Cubie color="dimgray"></Cubie>
        <Cubie color="dimgray"></Cubie>
    </Cube>
{/snippet}

{#snippet crossSideCorners(size: CubeSize, color: string, left: string, right: string)}
    <Cube {size}>
        <Cubie {color} top="white" {left}></Cubie>
        <Cubie {color} top="white"></Cubie>
        <Cubie {color} top="white" {right}></Cubie>

        <Cubie color="dimgray"></Cubie>
        <Cubie {color}></Cubie>
        <Cubie color="dimgray"></Cubie>

        <Cubie color="dimgray"></Cubie>
        <Cubie color="dimgray"></Cubie>
        <Cubie color="dimgray"></Cubie>
    
    </Cube>
{/snippet}

{#snippet f2l(size: CubeSize, color: string, left: string, right: string, rotate: boolean = false)}
    <div class:rotate-180={rotate}>
        <Cube {size}>
            <Cubie {color} top="white" {left}></Cubie>
            <Cubie {color} top="white"></Cubie>
            <Cubie {color} top="white" {right}></Cubie>

            <Cubie {color} {left}></Cubie>
            <Cubie {color}></Cubie>
            <Cubie {color} {right}></Cubie>

            <Cubie color="dimgray"></Cubie>
            <Cubie color="dimgray"></Cubie>
            <Cubie color="dimgray"></Cubie>
        </Cube>
    </div>
{/snippet}

{#snippet topCrossSide(size: CubeSize, color: string, left: string, right: string, topMiddle?: string)}
    <Cube {size}>
        <Cubie color="dimgray"></Cubie>
        <Cubie color={topMiddle ?? color} top="yellow"></Cubie>
        <Cubie color="dimgray"></Cubie>

        <Cubie {color} {left}></Cubie>
        <Cubie {color}></Cubie>
        <Cubie {color} {right}></Cubie>

        <Cubie {color} {left} bottom="white"></Cubie>
        <Cubie {color} bottom="white"></Cubie>
        <Cubie {color} {right} bottom="white"></Cubie>
    </Cube>
{/snippet}

{#snippet colors(colorStrings: string[])}
    {#each colorStrings as color, i}
        {#if color.toLowerCase() === "blue"}
            <span class="text-blue-400 font-bold" style=" text-shadow: 0 0 1px black;">{color}</span>
        {:else}
            <span 
            
                style="color: {color}; text-shadow: 0 0 1px {color};">{color}</span>{i < colorStrings.length - 1 ? "-" : ""}
        {/if}

    {/each}
{/snippet}

{#snippet alg(algString: string)}
    <p class="font-bold bg-slate-400 text-slate-800 rounded-sm text-xl px-2 py-1 ring ring-offset-4 text-center">{algString}</p>
{/snippet}

{#snippet inlineAlg(algString: string)}
    <span class="bg-slate-200 text-slate-900 rounded-sm px-1 font-bold inline-block">{algString}</span>
{/snippet}