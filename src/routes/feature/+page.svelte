<script lang="ts">
  import { goto } from "$app/navigation";
  import gsap from "gsap";
  import { onMount } from "svelte";

  let features: any;
  let signUpButton: any;

  onMount(() => {
    // Animate each FAQ section to fade in and slide up
    gsap.from(features.children, {
      opacity: 0, //Fully invisible
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
    });

    // Animate the sign-up button when it shows up
    gsap.from(signUpButton, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
    });
  });
  const navigateToChatBot = () => {
    goto("./chatbot");
  };
</script>

<div class="flex-grow flex flex-col items-center justify-center px-10 py-20">
  <h1 class="text-5xl font-bold mb-10">Features</h1>
  <div
    bind:this={features}
    class="flex flex-col md:flex-row items-center bg-white bg-opacity-20 p-10 rounded-lg shadow-lg text-center"
  >
    <div class="md:w-1/2 md:pl-10 mt-10 md:mt-0">
      <h2 class="text-3xl font-bold mb-5">
        Learn How to Flirt with Our AI Chatbot
      </h2>
      <p class="text-lg mb-5">
        Our chatbot uses advanced AI technology to teach you the art of
        flirting. Get real-time feedback and tips on how to approach
        conversations, understand body language, and build confidence.
      </p>
      <p class="text-lg mb-5">
        With personalized advice and interactive lessons, you'll become a pro at
        flirting in no time. Whether you're new to dating or just looking to
        improve your skills, our chatbot is here to help.
      </p>
      <button
        on:click={navigateToChatBot}
        class="bg-red-500 text-white font-bold py-3 px-8 text-xl rounded-full shadow-md focus:outline-none focus:shadow-outline active:scale-95 transition duration-150 ease-in-out hover:bg-red-600"
      >
        Get Started
      </button>
    </div>
  </div>
</div>
