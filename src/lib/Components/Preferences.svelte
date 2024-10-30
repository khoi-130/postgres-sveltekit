<script>
    import { writable } from 'svelte/store';
    // @ts-ignore
    import { profileShared, showPreferences } from '../../stores';
    import { onMount } from 'svelte';
    import gsap from 'gsap';
  import { fade } from 'svelte/transition';
  
  // You can subscribe to the store if needed
    /**
   * @type {boolean}
   */
    let isPreferencesVisible;;
    // @ts-ignore
    showPreferences.subscribe(value => {
      isPreferencesVisible = value;
    });

    // @ts-ignore
    function togglePreferences() {
        // @ts-ignore
        showPreferences.update(() => isPreferencesVisible = !isPreferencesVisible); // Toggle the value
  }
    // Initialize writable stores for each preference
    export let age = writable(18);
    export let confidence = writable(1);
    export let playfulness = writable(1);
    export let warmth = writable(1);
    export let politeness = writable(1);
    export let spicyness = writable(1);
    export let gender = writable('Not Specified');

    // Define a reactive array of slider configurations
    let sliders = [
        { label: 'Age', store: age, min: 18, max: 100, value: 18 },
        { label: 'Confidence', store: confidence, min: 1, max: 5, value: 1 },
        { label: 'Playfulness', store: playfulness, min: 1, max: 5, value: 1 },
        { label: 'Warmth', store: warmth, min: 1, max: 5, value: 1 },
        { label: 'Politeness', store: politeness, min: 1, max: 5, value: 1 },
        { label: 'Spiciness', store: spicyness, min: 1, max: 5, value: 1 }
    ];

    // Function to update slider value and sync with corresponding store
    // @ts-ignore
    function updateValue(sliderIndex, newValue) {
        const updatedSliders = [...sliders];
        updatedSliders[sliderIndex] = { ...updatedSliders[sliderIndex], value: newValue };
        sliders = updatedSliders;

        sliders[sliderIndex].store.set(newValue);
    }

     async function savePreferences() {
        // Compile current values from stores
        const currentPreferences = {
            age: $age,
            confidence: $confidence,
            playfulness: $playfulness,
            warmth: $warmth,
            politeness: $politeness,
            spiciness: $spicyness,
            gender: $gender
        };

        console.log("Saving preferences:", currentPreferences);
        profileShared.update(() => {
            return currentPreferences
        })

        // Example: Save the preferences (e.g., to a backend server or local storage)
        // For now, we're just logging to the console
     }
     onMount(async ()=> {
        showPreferences.subscribe(() => {
            animatePreferences();
        });
     })
         // Animate the preferences section
    function animatePreferences() {
        const preferencesDiv = document.querySelector('.preferences');
        if (isPreferencesVisible) {
            gsap.to(preferencesDiv, { 
                width: '16.666667%',
                duration: 0.1
            }); // Expand to 1/6
        } else {
            gsap.to(preferencesDiv, { 
                width: '5%',
                duration: 0.1
            }); // Shrink to smaller width
        }
    }

     export let openPreferences;
</script>

<div class="flex flex-col space-y-10 p-4">
    <button class="text-white hover:text-gray-400 focus:outline-none" on:click={() => togglePreferences()}>
        {#if isPreferencesVisible}
        <!-- Close icon (X) -->
        <svg in:fade class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <!-- Vertical line -->
            <rect x="26" y="16" width="4" height="32" fill="#ffffff" />
            <!-- Right arrow -->
            <polygon points="32,16 46,32 32,48" fill="#ffffff" />
        </svg>
        {:else}
        <svg in:fade class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <!-- Vertical line -->
            <rect x="34" y="16" width="4" height="32" fill="#ffffff" />
            <!-- Left arrow -->
            <polygon points="32,16 18,32 32,48" fill="#ffffff" />
          </svg>
        {/if}
    </button>
    {#if isPreferencesVisible}
      <div class="space-y-10 p-4">
          {#each sliders as slider, index}
              <div in:fade out:fade class="flex items-center space-x-2">
                  <label for={`slider-${index}`} class="block text-white font-medium">{slider.label}</label>
                  <input type="range" id={`slider-${index}`} min={slider.min} max={slider.max} value={slider.value}
                         on:input={(event) => updateValue(index, parseInt(event.target.value))}
                         class="slider bg-gray-200 appearance-auto h-2 rounded w-full" />
                  <span class="text-white">{slider.value}</span>
              </div>
          {/each}

          <div class="mt-4">
              <label for="gender-select" class="block text-white font-medium mb-2">Gender</label>
              <select id="gender-select" bind:value={$gender} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option value="Not Specified">Not Specified</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
              </select>
          </div>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md" on:click={savePreferences}>
              Save Preferences
          </button>
      </div>
    {/if}
</div>


<!-- -->
<style>
    input[type='range']{
        accent-color: #ed61d8;
    }
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #311B4B;
        cursor: pointer;
    }
    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #311B4B;
        cursor: pointer;
    }
    .preferences {
        transition: width 0.5s ease-in-out;
    }
    .icon {
      width: 50px;
      height: 50px;
    }
</style>