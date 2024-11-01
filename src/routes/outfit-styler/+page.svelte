<script>
    import { gsap } from "gsap";
    import { outfitData } from '$lib/stores';
    import { goto } from '$app/navigation';

    let budget = 100;
    let occasion = 'coffee_date';
    let includeAccessories = true;

    // Reactive breakdown based on the budget and selections
    $: breakdown = calculateBreakdown(budget, occasion, includeAccessories);

    function calculateBreakdown(budget, occasion, includeAccessories) {
        const allocationMap = {
            coffee_date: { top: 0.2, pants: 0.3, shoes: 0.3, accessories: 0.2 },
            casual_outing: { top: 0.25, pants: 0.25, shoes: 0.3, accessories: 0.2 },
            clubbing: { top: 0.4, pants: 0.2, shoes: 0.3, accessories: 0.1 },
            fancy_dinner: { top: 0.3, pants: 0.2, shoes: 0.2, accessories: 0.3 },
            live_concert: { top: 0.35, pants: 0.25, shoes: 0.3, accessories: 0.1 },
            outdoor_adventure: { top: 0.2, pants: 0.3, shoes: 0.4, accessories: 0.1 },
            movie_date: { top: 0.25, pants: 0.25, shoes: 0.3, accessories: 0.2 },
            art_gallery: { top: 0.35, pants: 0.2, shoes: 0.25, accessories: 0.2 },
            museum_tour: { top: 0.3, pants: 0.25, shoes: 0.2, accessories: 0.25 }
        };

        let allocation = { ...allocationMap[occasion] };

        if (!includeAccessories) {
            const { accessories, ...withoutAccessories } = allocation;
            const totalWithoutAccessories = Object.values(withoutAccessories).reduce((a, b) => a + b, 0);
            allocation = Object.fromEntries(
                Object.entries(withoutAccessories).map(([key, value]) => [key, (value / totalWithoutAccessories) * budget])
            );
        } else {
            allocation = Object.fromEntries(
                Object.entries(allocation).map(([key, value]) => [key, value * budget])
            );
        }

        return allocation;
    }

    function handleSubmit() {
        // Update the store with current values and breakdown
        outfitData.set({
            budget,
            occasion,
            includeAccessories,
            breakdown
        });

        // GSAP animation and page navigation
        gsap.to(".main-container", {
            x: "-100vw",
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                goto('outfit-styler/results');
            }
        });
    }
</script>

<main class="main-container">
    <div class="budget-options">

        <h1>Outfit Budget Calculator</h1>

        <label>Budget: ${budget}
            <input type="range" class="range-slider" bind:value={budget} min="100" max="1000" step="25">
        </label>

        <label>
            <input type="checkbox" bind:checked={includeAccessories}>
            Include Accessories
        </label>

        <!-- Occasion selection with dating-based categories -->
        <select bind:value={occasion}>
            <option value="coffee_date">Coffee Date</option>
            <option value="casual_outing">Casual Outing</option>
            <option value="clubbing">Clubbing</option>
            <option value="fancy_dinner">Fancy Dinner</option>
            <option value="live_concert">Live Concert</option>
            <option value="outdoor_adventure">Outdoor Adventure</option>
            <option value="movie_date">Movie Date</option>
            <option value="art_gallery">Art Gallery</option>
            <option value="museum_tour">Museum Tour</option>
        </select>

        <button on:click={handleSubmit}>Submit</button>
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
        font-family: BreadleySans, sans-serif;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 2rem;
    }

    .budget-options {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
        max-width: 90vw;
        width: 20rem;
        text-align: center;
    }
    h1 {
        font-size: 2.5rem;
        color: white;
    }

    label, select {
        font-size: 1.3rem;
        color: white;
    }

    input[type="range"] {
        width: 100%;
        margin-top: 0.5rem;
    }

    input[type="checkbox"] {
        transform: scale(1.2);
        margin-right: 0.5rem;
    }

    select {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1rem;
        color: #333;
        background-color: #fff;
    }

    button {
        font-size: 1.1rem;
        color: #881337;
        background: white;
        padding: 0.8rem 1.2rem;
        border-radius: 0.75rem;
        border: none;
        cursor: pointer;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 0.8rem 1.2rem rgba(0, 0, 0, 0.3);
    }

    button:active {
        transform: translateY(0);
        box-shadow: 0 0.5rem 0.8rem rgba(0, 0, 0, 0.2);
    }

</style>