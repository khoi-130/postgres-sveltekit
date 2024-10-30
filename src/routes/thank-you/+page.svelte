<script>
    import { onMount } from 'svelte';
  
    // Optional: Redirect to the home page after a few seconds
    onMount(() => {
      setTimeout(() => {
        window.location.href = '/'; // Redirect to home or any other page
      }, 5000); // Adjust the delay as needed (5 seconds here)
    });
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-orange-50">
    <div class="text-center bg-white rounded-lg shadow-lg p-10 max-w-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
      <p class="text-lg text-gray-600 mb-6">
        Your message has been successfully sent. We appreciate you reaching out to us and will get back to you as soon as possible.
      </p>
      <p class="text-gray-500">
        You will be redirected to the home page shortly.
      </p>
    </div>
  </div>
  
  <style>
    .min-h-screen {
      min-height: 100vh;
    }
  </style>
  