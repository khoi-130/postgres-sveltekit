<script>
  let showPopup = true;

const acceptCookies = () => {
  showPopup = false;
};

const dismissPopup = () => {
  showPopup = false;
};

  import "../app.css";
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

  const navigateToMainPage = () => {
    goto("/")
  }
</script>

<header class="flex justify-between items-center px-10 py-5 bg-fixed bg-cover bg-center" style="background-image: url('/src/lib/images/flower-header.jpg');">
  <div>
    <div class="text-4xl font-extrabold text-pink-600">FlirtWise</div>
    <br>
    <div class="text-xl italic text-gray-200 animate-slideIn">Let Us Unlock Your Charm</div>
</div>

  <nav class="flex space-x-4">
    <button on:click={navigateToMainPage}
      class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
    >
      Home
    </button>
    <button
      on:click={navigateToFeature}
      class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
    >
      Features
    </button>
    <button
      on:click={navigateToAbout}
      class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
    >
      About Us
    </button>
    <button
      on:click={navigateToContactUs}
      class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
    >
      Contact Us
    </button>
    <SignedIn>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
    <SignedOut>
      <SignInButton
        class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
        >Sign in</SignInButton
      >
      <SignUpButton
        class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
        >Sign up</SignUpButton
      >
    </SignedOut>
  </nav>
</header>
<main class="flex flex-col min-h-screen">
  <slot />
</main>
<footer class="bg-black bg-opacity-20 shadow-md p-5 mt-5">
  <div class="grid grid-cols-2 gap-20">
    <div>
      <ul class="list-none pl-5">
        <li class="font-bold text-lg">PROJECT: PROTOTYPE</li>
        <li class="text-black">© FlirtWise Limited Ltd. All Rights Reserved.</li>
      </ul>
    </div>
    <div>
      <ul class="list-none text-right pr-20">
        <button on:click={naviagetoFaq} class="underline">FAQ</button>
        <br />
        <button on:click={navigateToTermsAndService} class="underline">Terms of Service</button>
      </ul>
    </div>
  </div>
</footer>



