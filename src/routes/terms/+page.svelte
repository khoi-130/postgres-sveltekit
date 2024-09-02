<script>
    import { goto } from '$app/navigation';
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
          on:click={() => goto('./signup')}>
          Sign Up
        </button>
      </nav>
    </header>
    <div class="flex-grow flex flex-col items-center justify-center px-10 py-20">
      <h1 class="text-5xl font-bold mb-10">Terms & Service</h1>
      <div class="w-full max-w-4xl bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-left">
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p class="text-lg">By using Flirting App, you agree to comply with and be bound by these Terms & Service. Please review them carefully. If you do not agree to these terms, you should not use our service.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">2. Privacy Policy</h2>
          <p class="text-lg">We are committed to protecting your privacy. Our Privacy Policy explains how we collect, use, and safeguard your information when you use our app. By using the app, you agree to the terms outlined in our Privacy Policy.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">3. User Responsibilities</h2>
          <p class="text-lg">You are responsible for your use of the Flirting App and for any content you post. You agree not to misuse the service, and you must comply with all applicable laws and regulations. Any breach of these responsibilities may result in suspension or termination of your account.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">4. Prohibited Activities</h2>
          <p class="text-lg">Users are prohibited from engaging in illegal activities, harassment, or any behavior that could harm other users. Any violation may result in immediate account suspension or legal action.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">5. Intellectual Property</h2>
          <p class="text-lg">All content, including text, images, and software, is the property of Flirting App or its licensors and is protected by intellectual property laws. You agree not to reproduce, distribute, or create derivative works from this content without express permission.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">6. Termination</h2>
          <p class="text-lg">We reserve the right to terminate or suspend your account at any time, with or without notice, for any reason, including but not limited to a breach of these Terms & Service.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">7. Modifications to Terms</h2>
          <p class="text-lg">We may modify these Terms & Service at any time. Any changes will be effective immediately upon posting. Your continued use of the service after any modifications indicate your acceptance of the new terms.</p>
        </div>
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-2">8. Contact Information</h2>
          <p class="text-lg">If you have any questions or concerns about these Terms & Service, please contact us at support@flirtingapp.com.</p>
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
  