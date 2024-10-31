<script lang="ts">
  import "../app.css";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import SignedIn from "clerk-sveltekit/client/SignedIn.svelte";
  import SignedOut from "clerk-sveltekit/client/SignedOut.svelte";
  import SignInButton from "clerk-sveltekit/client/SignInButton.svelte";
  import SignUpButton from "clerk-sveltekit/client/SignUpButton.svelte";
  import UserButton from "clerk-sveltekit/client/UserButton.svelte";


  // Import GSAP globally
  import { gsap } from "gsap";
    import Header from "$lib/Components/Header.svelte";
    import Footer from "$lib/Components/Footer.svelte";

  const navigateToFeature = () => {
    goto("./feature")
  }

  onMount(() => {
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for sections
    gsap.from(".fade-in-section", 
    {
      opacity: 1,
        x: 0,  // Move to the original position
        duration: 2.5,
        ease: "power2.out",
      scrollTrigger: {
        trigger: ".fade-in-section",
          start: "top 80%",  // When the top of the section hits 80% of the viewport height
          end: "bottom 20%",  // When the bottom of the section hits 20% of the viewport
          toggleActions: "play reverse play reverse",  // Play on scroll down, reverse on scroll up
          scrub: true  // Smooth scroll animation
      },
    });

    // Example of parallax scrolling for background
    gsap.to(".parallax-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom", 
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      ".shiny-text",
      { backgroundPosition: "200%" }, // Start position (off the screen)
      {
        backgroundPosition: "-200%",   // End position (off the screen on the right)
        duration: 3,                  // Duration of the effect
        ease: "power2.inOut",          // Easing function for smooth movement
        repeat: -1,                   // Infinite repeat
      }
    );

  });
});

  let activeIndex : null; // Track which accordion item is currently open

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      activeIndex = null; // Close the accordion if it's already open
    } else {
      activeIndex = index; // Open the selected accordion item
    }
  };
</script>

<main>

<!-- First Section with Clickable Accordion -->
<div class="flex flex-col lg:flex-row bg-rose-900 opacity-100 fade-in">
  <!-- Left Section (Accordion + Title) -->
  <div class="flex-auto text-white text-center lg:w-1/2 p-8 lg:px-16 lg:py-24">
    <h1 class="font-serif	 text-white text-6xl lg:text-7xl mb-12">How Can We Help?</h1>
    
    <!-- Accordion Section -->
    <div class="space-y-6">
      {#each [
        { 
          title: 'FLIRTING SKILL', 
          content: `Understand how the flirting process works.\nPrepare before dating.\nEvaluate your flirting skill from 1 to 100.` 
        },
        { 
          title: 'IMPROVE YOUR CONFIDENCE', 
          content: `Find resources and support.\nRead stories from other partners.\nMake your partner smile at you.` 
        },
        { 
          title: 'PROFESSIONAL GUIDANCE', 
          content: `Get information on how to help.\nLearn about flirting services.\nLearn between flirting and harrasment.` 
        }
      ] as item, index}
        
        <div class="accordion-item  hover:bg-opacity-20 transition duration-200" data-index={index}>
          
          <!-- Accordion Button (Click to toggle content) -->
          <button 
            class="flex justify-between items-center w-full px-6 py-4 text-white text-2xl font-semibold cursor-pointer outline-none focus:outline-none border-b"
            on:click={() => toggleAccordion(index)}>
            {item.title}
            <span class="icon text-xl">{activeIndex === index ? '-' : '+'}</span> <!-- Change icon based on state -->
          </button>

          <!-- Accordion Content -->
          <div class="content overflow-hidden transition-all duration-300" style="max-height: {activeIndex === index ? '300px' : '0'}; opacity: {activeIndex === index ? '1' : '0'};">
            {#if activeIndex === index}
            <div class="pl-6"> 
            <ul class="list-disc list-inside text-left text-white">
              {#each item.content.split('\n') as line}
                <li class="py-1">{line}</li>
              {/each}
            </ul>            
            </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>



  <!-- Right Section (Image) -->
  <div class="flex-auto relative flex items-center justify-center  lg:w-1/2 p-8">
    <div class="w-96 h-96">
      <img class="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white fade-in-image" src="/src/lib/images/FlirtingImage.jpg" alt="Several people drinking" />
    </div>
  </div>
</div>


<!-- Additional Section 1 -->
<div class="py-20 bg-orange-50 text-center fade-in">
  <!-- Heading -->
  <h2 class="text-6xl italic text-rose-900 mb-6 shiny-text">Build Your Confidence</h2>

  <!-- Subheading -->
  <p class="text-2xl text-rose-700 max-w-3xl mx-auto leading-relaxed mb-10">Learn the art of flirting with our AI-powered chatbot. Get feedback in real-time and improve your conversation skills.</p>

  <!-- Button Section -->
  <div class="flex justify-center space-x-4 mt-8">
    <SignedIn>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
    <SignedOut>
      <SignInButton
      class="w-auto text-rose-600 font-semibold py-1 text-lg underline decoration-2 bg-transparent hover:text-rose-700 mr-20">
      Sign in
      </SignInButton>
      <SignUpButton
      class="w-auto text-rose-600 font-semibold py-1 text-lg underline decoration-2 bg-transparent hover:text-rose-700">
      Sign up
      </SignUpButton>
    </SignedOut>
  </div>
</div>

<!-- Master the Art of Conversation -->
<div class="flex flex-col md:flex-row items-center py-20 bg-orange-100 fade-in">
  <!-- Left Section: Text Content -->
  <div class="md:w-1/2 p-10 lg:pl-20 fade-in-image space-y-6">
    <h2 class="text-6xl text-rose-900 italic	leading-tight">Master the Art of Conversation</h2>
    <p class="text-2xl text-rose-700 leading-relaxed">Practice in different scenarios and become a master of conversation. The more you practice, the better you become.</p>
    <button on:click={navigateToFeature}   class="mt-8 px-6 py-3 bg-white text-red-600 border border-red-600 text-lg font-semibold shadow-md hover:bg-red-600 hover:text-white transition ease-in-out duration-200 transform hover:scale-105">Feature</button>
  </div>
  <!-- Right Section: Image -->
  <div class="md:w-1/2 flex justify-center p-10 lg:pr-20">
    <img
      class="w-3/4 lg:w-7/12 rounded-lg shadow-xl fade-in-image transform transition-all duration-300 hover:scale-105"
      src="/src/lib/images/TextingAnimatedGIF.gif"
      alt="Conversation"
    />
  </div>
</div>

<div class="flex flex-col lg:flex-row items-center h-screen w-screen overflow-hidden bg-orange-50 relative">
  <!-- Left Side: Video with 9:16 Aspect Ratio -->
  <div class="relative w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden">
    <video autoplay muted loop playsinline class="h-full w-auto object-cover transform transition duration-700 hover:scale-105">
      <source src="/src/lib/videos/CoupleTexting.mp4" type="video/mp4" />
    </video>
  </div>

  <!-- Flirting Animation: Floating Hearts -->
  <div class="absolute inset-0 pointer-events-none z-20">
    <div class="floating-hearts"></div>
  </div>

  <!-- Right Side: Text Content -->
  <div class="relative z-10 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full lg:w-1/2  p-5 lg:p-10">
    <h2 class="text-5xl lg:text-6xl italic leading-tight mb-10">Become The Ultimate Learner</h2>
    <p class="text-xl lg:text-2xl max-w-xl text-rose-700 leading-relaxed">With personalized feedback, track your progress and learn how to approach any situation with confidence.</p>
    <button class="mt-8 px-6 py-3 bg-white text-red-600 border border-red-600 text-lg font-semibold shadow-md hover:bg-red-600 hover:text-white transition ease-in-out duration-200 transform hover:scale-105">Tutorial</button>
  </div>
</div>
<Footer/>
</main>