<script>
    import { gsap } from "gsap";
    import { outfitData } from '$lib/stores';
    import {onDestroy, onMount} from 'svelte';
    import { getInfoForOccasion } from '$lib/occasion_info.js';

    let budget, occasion, includeAccessories, breakdown, occasionInfo;

    // Subscribe to the store and retrieve the values
    const unsubscribe = outfitData.subscribe(data => {
        budget = data.budget;
        occasion = data.occasion;
        includeAccessories = data.includeAccessories;
        breakdown = data.breakdown;

        if (!includeAccessories) {
            breakdown.accessories = 0;
        }
        occasionInfo = getInfoForOccasion(occasion, breakdown);

    });

    onDestroy(unsubscribe);

    function formatOccasion(occasion) {
        return occasion
            .replace(/_/g, ' ')         // Replace underscores with spaces
            .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize each word
    }

    onMount(() => {
        gsap.fromTo(".results-container",
            { x: "100vw" }, // Start off-screen to the right
            {
                x: "0", // Transition to its natural position
                duration: 1,
                ease: "power2.out"
            }
        );
    });
</script>

<main class="results-container">
    <div class="results">
        <h1>Outfit Budget Breakdown</h1>
        <p><strong>Occasion:</strong> {formatOccasion(occasion)}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Include Accessories:</strong> {includeAccessories ? 'Yes' : 'No'}</p>
        <h2>Breakdown:</h2>
        <p><strong>Top:</strong> ${breakdown.top.toFixed(2)}</p>
        <p><strong>Pants:</strong> ${breakdown.pants.toFixed(2)}</p>
        <p><strong>Shoes:</strong> ${breakdown.shoes.toFixed(2)}</p>
        <p><strong>Accessories:</strong> ${breakdown.accessories.toFixed(2)}</p>
    </div>

    <div class="additional-content">
        <h2>Outfit Tip</h2>
        <p>{occasionInfo.paragraph}</p>
        <ul>
            {#each occasionInfo.bulletPoints as item}
                <li><strong>{item.label}:</strong> {item.description}</li>
            {/each}
        </ul>
    </div>
</main>

<style>
    @font-face {
        font-family: 'BreadleySans';
        src: url('/Fonts/BreadleySans-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    :global(body) {
        background: linear-gradient(135deg, #855d6a, #881337);
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
        font-family: BreadleySans, sans-serif;
    }

    main.results-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        gap: 2rem;
        padding: 2rem;
        width: 100%;
        max-width: 60rem; /* Limit total container width */
    }

    .results, .additional-content {
        background: rgba(255, 255, 255, 0.15);
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        color: #e8e8e8;
        width: 100%;
        max-width: 24rem;
    }

    .results {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: left;
        color: #e8e8e8;
    }

    h1, h2 {
        color: #ffffff;
        text-align: center;
        width: 100%;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 0.5rem;
    }

    h2 {
        font-size: 2rem;
        margin-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding-top: 0.5rem;
    }

    .additional-content h2 {
        font-size: 1.8rem;
        color: #ffffff;
        text-align: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    p {
        font-size: 1.4rem;
        color: #dcdcdc;
        margin: 0.2rem 0;
    }

    .additional-content p {
        font-size: 1.4rem;
        margin-bottom: 1rem;
        color: #e8e8e8;
        text-align: center;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    ul {
        list-style-type: disc;
        padding-left: 1.5rem;
    }

    li {
        font-size: 1.2rem;
        color: #dcdcdc;
        margin: 0.5rem 0;
    }

    strong {
        font-weight: bold;
        color: #000000;
    }

    /* Responsive adjustments */
    @media (max-width: 48rem) {
        main.results-container {
            flex-direction: column;
            align-items: center;
        }
        .results, .additional-content {
            max-width: 90%;
        }
    }
</style>