<script>
    import { fly } from "svelte/transition";
  
    export let messageSent;
  </script>
  
  <main>
    {#if messageSent}
      <div in:fly={{ y: 200, duration: 2000 }} id="message" class="typing">
        {messageSent}
      </div>
    {/if}
  </main>
  