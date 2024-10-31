<script>
    import "../../app.css" ;
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { gsap } from "gsap";
  

  
    const navigateToMainPage = () => {
      goto("/");
    };

    onMount(() => {
        // Animation for the sliding text
        gsap.from(".slide-in-from-right", {
            x: 100,       // start 100px to the right
            opacity: 0,   // start fully transparent
            duration: 1,  // duration of the animation
            ease: "power2.out" // easing effect
        });
    });
  
  </script>
<main>
    <header class="flex justify-between items-center px-3 py-1 bg-fixed bg-cover bg-center">
        <button on:click={navigateToMainPage} class="flex items-center space-x-2">
            <img class="w-max rounded-lg shadow-lg border-9 fade-in-image"
                 src="/src/lib/images/Logo.png" alt="App Logo"/>
        </button>
        <div class="text-xl italic text-gray-600 slide-in-from-right">Let Us Unlock Your Charm</div>
    </header>
</main>

<style>

</style>