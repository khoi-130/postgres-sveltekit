<script>
  import "../app.css";
  import ___ASSET___0 from "../lib/images/night-image.png";
  import { goto } from "$app/navigation";
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
  import SignInButton from "clerk-sveltekit/client/SignInButton.svelte";
  import SignUpButton from "clerk-sveltekit/client/SignUpButton.svelte";
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";

  const navigateToChatbot = () => {
    goto("./chatbot");
  };

  const navigateToFeature = () => {
    goto("./feature");
  };

  const navigateToSignUp = () => {
    goto("/sign-up");
  };

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
</script>

  
<main>
  <slot />
</main>

