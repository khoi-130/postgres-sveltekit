<script lang="ts">
  import { gsap } from 'gsap';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let faqSections: any
  let signUpButton: any;

  onMount(() => {
    // Animate each FAQ section to fade in and slide up
    gsap.from(faqSections.children, {
      opacity: 0, //Fully invisible 
      y: 50,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.3,
    });

    // Animate the sign-up button when it shows up
    gsap.from(signUpButton, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.3,
    });
  });

  const navigateToSignUp = () => {
    gsap.to(signUpButton, { scale: 1.1, duration: 0.2, ease: 'back.out(1.7)' });
    goto('./sign-up');
  };
</script>

  <div class="flex-grow flex flex-col items-center justify-center px-10 py-20">
    <h1 class="text-5xl font-bold mb-10">Frequently Asked Questions</h1>

    <!-- FAQ Container for animation -->
    <div
      bind:this={faqSections}
      class="w-full max-w-4xl bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-left"
    >
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

      <!-- Button for sign-up -->
      <div class="text-center mt-10">
        <button bind:this={signUpButton} on:click={navigateToSignUp}
          class="bg-red-500 text-white font-bold py-3 px-8 text-xl rounded-full shadow-md focus:outline-none focus:shadow-outline active:scale-95 transition duration-150 ease-in-out hover:bg-red-600">
          Sign Up Now
        </button>
      </div>
    </div>
  </div>
