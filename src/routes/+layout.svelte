<script>

  
  import "../app.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export const prerender = true;


  const navigateToAbout = () => {
    goto("./about");
  };

  const navigateToContactUs = () => {
    goto("./contact");
  };

  const naviagetoFaq = () => {
    goto("/FAQ");
  };

  const navigateToTermsAndService = () => {
    goto("/terms");
  };

  const navigateToMainPage = () => {
    goto("/");
  };

  const navigateToDraft = () => {
    goto("/draft");
  };

</script>


<main class="flex flex-col min-h-screen">
  <slot />
</main>
