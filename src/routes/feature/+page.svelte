<script>
    import { goto } from '$app/navigation';
  
    const navigateToHome = () => {
      goto('./home');
    };

    const navigateToChatbot = () => {
        goto('./chatbot');
    }
  </script>
  
  <main class="font-monte flex flex-col min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
    <header class="flex justify-between items-center px-10 py-5 bg-white bg-opacity-20 shadow-md">
      <div class="text-2xl font-bold">Flirting App</div>
      <nav class="flex space-x-4">
        <button
          class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
          on:click={() => goto('./')}>
          Home
        </button>
        <button
          class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
          on:click={() => goto('./features')}>
          Features
        </button>
        <button
          class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
          on:click={() => goto('./about')}>
          About Us
        </button>
        <button
          class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
          on:click={() => goto('./contact')}>
          Contact
        </button>
        <button
          class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
          on:click={() => goto('./signup')}>
          Sign Up
        </button>
      </nav>
    </header>
    <div class="flex-grow flex flex-col items-center justify-center px-10 py-20">
      <h1 class="text-5xl font-bold mb-10">Features</h1>
      <div class="flex flex-col md:flex-row items-center bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center">
        <div class="md:w-1/2 md:pl-10 mt-10 md:mt-0">
          <h2 class="text-3xl font-bold mb-5">Learn How to Flirt with Our AI Chatbot</h2>
          <p class="text-lg mb-5">Our chatbot uses advanced AI technology to teach you the art of flirting. Get real-time feedback and tips on how to approach conversations, understand body language, and build confidence.</p>
          <p class="text-lg mb-5">With personalized advice and interactive lessons, you'll become a pro at flirting in no time. Whether you're new to dating or just looking to improve your skills, our chatbot is here to help.</p>
          <button on:click={navigateToChatbot}
            class="bg-red-500 text-white font-bold py-3 px-8 text-xl rounded-full shadow-md focus:outline-none focus:shadow-outline active:scale-95 transition duration-150 ease-in-out hover:bg-red-600">
            Get Started
          </button>
        </div>
      </div>
    </div>
    <footer class="bg-white bg-opacity-20 shadow-md p-5 mt-10">
      <div class="grid grid-cols-2 gap-20">
        <div>
          <ul class="list-none pl-5">
            <li class="font-bold text-lg">PROJECT: PROTOTYPE</li>
            <li class="text-white">© 2023 - 2024</li>
            <li class="text-white">Privacy — Terms</li>
          </ul>
        </div>
        <div>
          <ul class="list-none text-right pr-20">
            <li class="text-white">FAQ</li>
            <li class="text-white">Terms of Service</li>
          </ul>
        </div>
      </div>
    </footer>
  </main>
  