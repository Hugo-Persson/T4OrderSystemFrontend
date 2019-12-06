import {
    writable
} from "svelte/store";

export const url = writable("");
export const params = writable({});