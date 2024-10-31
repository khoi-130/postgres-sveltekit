<script>
  import "../app.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";



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


<header class="flex justify-between items-center px-3 py-1 bg-fixed bg-cover bg-center">  
  <button on:click={navigateToMainPage}>
    <img class="w-max rounded-lg shadow-lg border-9 fade-in-image"
    src="/src/lib/images/Logo.png"alt="App Logo"/>
    <br/>
    <div class="text-xl italic text-gray-600 animate-slideIn">Let Us Unlock Your Charm</div>
  </button>
</header>

<main class="flex flex-col min-h-screen">
  <slot />
</main>
<footer class=" bg-opacity-90 text-white shadow-lg p-8 mt-auto">
  <div class="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
    
    <!-- Left Column: Company Info -->
    <div>
      <ul class="list-none space-y-2">
        <li class="font-bold text-black text-xl tracking-wide uppercase">Capstone Project</li>
        <li class="text-sm text-gray-400">© Love Ascend Limited Ltd. All Rights Reserved.</li>
      </ul>
    </div>

<!-- Right Column: Links (Table with 2 rows and 3 columns, reduced gap) -->
<div class="overflow-x-auto">
  <table class="min-w-full table-auto text-gray-400">
    <tbody>
      <tr>
        <td class="px-2 py-2 text-center"> <!-- Reduced horizontal padding (px-2) -->
          <button on:click={naviagetoFaq} class="underline hover:text-black transition ease-in-out duration-200">
            FAQ
          </button>
        </td>
        <td class="px-1 py-2 text-center"> <!-- Reduced horizontal padding (px-2) -->
          <button on:click={navigateToTermsAndService} class="underline hover:text-black transition ease-in-out duration-200">
            Terms of Service
          </button>
        </td>
        <td class="px- py-2 text-center"> <!-- Reduced horizontal padding (px-2) -->
          <button on:click={navigateToAbout} class="underline hover:text-black transition ease-in-out duration-200">
            About Us
          </button>
        </td>
      </tr>
      <tr>
        <td class="px-10 py-2 text-center"> <!-- Reduced horizontal padding (px-2) -->
          <button on:click={navigateToContactUs} class="underline hover:text-black transition ease-in-out duration-200">
            Contact Us
          </button>
        </td>
        <td class="px-10 py-2 text-center"> <!-- Reduced horizontal padding (px-2) -->
          <button on:click={navigateToDraft} class="underline hover:text-black transition ease-in-out duration-200">
            Draft
          </button>
        </td>
        <td class="px-2 py-2 text-center"> <!-- Empty space or extra button here if needed -->
        </td>
      </tr>
    </tbody>
  </table>
</div>



  </div>
  <!-- Footer Bottom Bar -->
  <div class="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
    Built with ❤️ by Love Ascend Team
  </div>
</footer>