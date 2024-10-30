import { writable } from 'svelte/store';

export const outfitData = writable({
    budget: 100,
    occasion: 'coffee_date',
    includeAccessories: true,
    breakdown: {
        top: 0,
        pants: 0,
        shoes: 0,
        accessories: 0
    }
});