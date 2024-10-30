<script>
    import "../../app.css" ;
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
  
  

  
    const navigateToMainPage = () => {
      goto("/");
    };
  

  
  </script>
<main>
    <header class="flex justify-between items-center px-3 py-1 bg-fixed bg-cover bg-center">  
        <button on:click={navigateToMainPage}>
          <img class="w-max rounded-lg shadow-lg border-9 fade-in-image"
          src="/src/lib/images/Logo.png"alt="App Logo"/>
          <br/>
          <div class="text-xl italic text-gray-600 animate-slideIn">Let Us Unlock Your Charm</div>
        </button>
      </header>
</main>
