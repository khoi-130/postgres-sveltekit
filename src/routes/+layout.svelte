<script>
  import "../app.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export const prerender = true;


</script>


<main class="flex flex-col min-h-screen">
  <slot />
</main>
