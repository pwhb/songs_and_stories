import { writable } from 'svelte/store';

const configStore = writable({});

export const audioStore = writable();

export const search = writable('');
export const filteredResults = writable([]);
