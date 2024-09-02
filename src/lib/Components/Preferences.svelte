<script>
    import { writable } from 'svelte/store';

    // Initialize writable stores for each preference
    export let age = writable(18);
    export let confidence = writable(1);
    export let playfulness = writable(1);
    export let warmth = writable(1);
    export let politeness = writable(1);
    export let spiciness = writable(1);
    export let gender = writable('Not Specified');

    // Define a reactive array of slider configurations
    let sliders = [
        { label: 'Age', store: age, min: 18, max: 100, value: 18 },
        { label: 'Confidence', store: confidence, min: 1, max: 5, value: 1 },
        { label: 'Playfulness', store: playfulness, min: 1, max: 5, value: 1 },
        { label: 'Warmth', store: warmth, min: 1, max: 5, value: 1 },
        { label: 'Politeness', store: politeness, min: 1, max: 5, value: 1 },
        { label: 'Spiciness', store: spiciness, min: 1, max: 5, value: 1 }
    ];

    // Function to update slider value and sync with corresponding store
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
            spiciness: $spiciness,
            gender: $gender
        };

        console.log("Saving preferences:", currentPreferences);

        // Example: Save the preferences (e.g., to a backend server or local storage)
        // For now, we're just logging to the console
    }

</script>

<div class="space-y-4 p-4">
    {#each sliders as slider, index}
        <div class="flex items-center space-x-2">
            <label for={`slider-${index}`} class="block text-gray-700 font-medium">{slider.label}</label>
            <input type="range" id={`slider-${index}`} min={slider.min} max={slider.max} value={slider.value}
                   on:input={(event) => updateValue(index, parseInt(event.target.value))}
                   class="slider bg-gray-200 appearance-none h-2 rounded w-full" />
            <span class="text-gray-600">{slider.value}</span>
        </div>
    {/each}

    <div class="mt-4">
        <label for="gender-select" class="block text-gray-700 font-medium mb-2">Gender</label>
        <select id="gender-select" bind:value={$gender} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value="Not Specified">Not Specified</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
    </div>
</div>

<button class="px-4 py-2 bg-blue-500 text-white rounded-md" on:click={savePreferences}>
    Save Preferences
</button>


<!-- -->
<style>
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
</style>