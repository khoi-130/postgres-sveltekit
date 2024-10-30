<script>
    import "../../app.css" ;
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { gsap } from "gsap";
  

  
    const navigateToMainPage = () => {
      goto("/");
    };
  

  
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