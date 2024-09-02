<script>
    import { goto } from '$app/navigation';
  
    const navigateToSignUp = () => {
      goto('./signup');
    };
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
          on:click={() => goto('./faq')}>
          FAQ
        </button>
        <button
          class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500"
          on:click={() => goto('./sign-up')}>
          Sign Up
        </button>
      </nav>
    </header>
    <div class="flex-grow flex flex-col items-center justify-center px-10 py-20">
      <h1 class="text-5xl font-bold mb-10">Frequently Asked Questions</h1>
      <div class="w-full max-w-4xl bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-left">
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">What is Flirting App?</h2>
          <p class="text-lg">Flirting App is a platform designed to help users improve their flirting skills through interactive lessons and real-time feedback from an AI-powered chatbot.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">How does the AI Chatbot work?</h2>
          <p class="text-lg">Our AI chatbot uses advanced algorithms to simulate real conversations, providing you with tips and feedback to enhance your flirting techniques. It’s like having a personal coach in your pocket!</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">Is the app safe to use?</h2>
          <p class="text-lg">Absolutely! We prioritize user safety by implementing strict privacy policies, encrypted communications, and features that allow you to report inappropriate behavior.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">Can I use the app for free?</h2>
          <p class="text-lg">Yes, you can start using the basic features of Flirting App for free. We also offer premium features for users who want to take their flirting skills to the next level.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">How do I get started?</h2>
          <p class="text-lg">Getting started is easy! Simply sign up for an account and start chatting with our AI to improve your flirting skills. Click the button below to join now!</p>
        </div>
        <div class="text-center mt-10">
          <button on:click={navigateToSignUp}
            class="bg-red-500 text-white font-bold py-3 px-8 text-xl rounded-full shadow-md focus:outline-none focus:shadow-outline active:scale-95 transition duration-150 ease-in-out hover:bg-red-600">
            Sign Up Now
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
  