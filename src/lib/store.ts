import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const theme = writable<'dark' | 'light'>();
if (browser) {
	theme.set(
		//@ts-ignore
		localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
	);

	theme.subscribe((value) => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(value);
		localStorage.setItem('theme', value);
	});
}
