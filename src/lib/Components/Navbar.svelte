<script>
    import Preferences from "$lib/Components/Preferences.svelte";
    import { slide } from "svelte/transition";
    import { goto } from '$app/navigation';


    let isPreferencesOpen = false;

    function togglePreferences() {
        isPreferencesOpen = !isPreferencesOpen;
    }


    //Go back to the main home page
    const navigateToHomePage = () => {
    goto('/');
  };

    export let activePage = '';
    export let sideChats = [];
</script>

<div class="flex-none w-42 text-white border-r-2 bg-tekhelet border-black">
    <div class="flex flex-col h-full p-4">
        <button on:click={navigateToHomePage} class="rounded-3xl w-36 h-14 mb-4 bg-purple-haze border-black">Home</button>
        <button class="rounded-3xl w-36 h-14 mb-4 bg-purple-haze">Learn Routes</button>
        <button class="rounded-3xl w-36 h-14 mb-4 bg-purple-haze">Settings</button>
        {#if activePage === "/chatbot"}
            <hr class="my-2">
            {#each sideChats as chat}
                <button class="rounded-lg mt-2 hover:bg-Wisteria opacity-50">{chat.name}</button>
            {/each}
            <button on:click={togglePreferences} class="w-36 h-14 mt-auto bg-purple-haze border border-black border-opacity-50 rounded-md text-white text-base cursor-pointer">
                Advanced Options
            </button>
        {/if}
    </div>
    {#if isPreferencesOpen}
        <div tabindex="0" role="button" class="fixed inset-0 bg-black bg-opacity-50 z-40" on:click={togglePreferences} on:keydown={(event) => { if (event.key === 'Enter' || event.key === ' ') { togglePreferences(); } }} aria-label="Close Preferences"></div>
        <div class="fixed top-1/2 right-0 -translate-y-1/2 transform transition-transform duration-600 z-50" transition:slide={{ duration: 600, axis: 'x' }}>
            <Preferences />
        </div>
    {/if}
</div>