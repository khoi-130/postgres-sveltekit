// src/preferencesStore.js
import { writable } from 'svelte/store';
export let profileShared = writable({
    age: 18,
    confidence: 1,
    playfulness: 1,
    warmth: 1,
    politeness: 1,
    spiciness: 1,
    gender: "Not specified",
    scenario: 1
})
export const showPreferences = writable(false);
