<script>
    import "../app.css";
    import ___ASSET___0 from '../lib/images/night-image.png';
    import { goto } from '$app/navigation';
  
    const navigateToChatbot = () => {
      goto('./chatbot');
    };
</script>

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