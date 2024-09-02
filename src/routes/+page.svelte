<script>
	import ___ASSET___0 from '../lib/images/night-image.png';
	import { goto } from '$app/navigation';
  
	const navigateToChatbot = () => {
	  goto('./chatbot');
	};

	const navigateToFeature = () => {
	  goto('./feature');
	};

	const navigateToSignUp = ()  => {
	  goto('./sign-up')	
	};

	const navigateToAbout = () => {
		goto('./about')
	};

	const navigateToContactUs = () => {
		goto('./contact')
	}

	const naviagetoFaq = () => {
		goto('/FAQ')
	}

	const navigateToTermsAndService = () => {
		goto('/terms')
	}

  </script>
  
  <main class="font-monte flex flex-col min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
	<header class="flex justify-between items-center px-10 py-5 bg-white bg-opacity-20 shadow-md">
		<div class="text-2xl font-bold">Flirting App</div>
		<nav class="flex space-x-4">
		  <button
			class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500">
			Home
		  </button>
		  <button on:click={navigateToFeature}
			class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500">
			Features
		  </button>
		  <button on:click={navigateToAbout}
			class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500">
			About Us
		  </button>
		  <button on:click={navigateToContactUs}
			class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500">
			Contact Us
		  </button>
		  <button on:click={navigateToSignUp}
			class="bg-yellow-400 text-gray-800 font-bold py-2 px-4 text-lg rounded-full shadow-md focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out hover:bg-yellow-500">
			Sign Up
		  </button>
		</nav>
	  </header>
	
	<div class="flex flex-grow">
	  <div class="flex-auto text-center justify-start pt-32">
		<h1 class="text-7xl pb-10">Flirting is Hard</h1>
		<h1 class="text-7xl pt-10">Become The Ultimate Seducer</h1>
	  </div>
	  <div class="flex-auto relative flex items-center justify-center pr-20">
		<img class="w-3/4 rounded-lg shadow-lg border-4 border-white" src={___ASSET___0} alt="several people drinking" />
		<button on:click={navigateToChatbot}
		  class="absolute bottom-10 transform bg-red-500 text-white font-bold py-4 px-10 text-xl rounded-full shadow-md focus:outline-none focus:shadow-outline active:scale-95 transition duration-150 ease-in-out hover:bg-red-600">
		  Start Here
		</button>
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
			<button on:click={naviagetoFaq}>FAQ</button>
			<br>
			<button on:click={navigateToTermsAndService}>Terms of Service</button>
		  </ul>
		</div>
	  </div>
	</footer>
  </main>
  