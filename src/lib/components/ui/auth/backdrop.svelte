<script lang="ts">
	import { page } from '$app/stores';

	let classes: string;
	page.subscribe(({ url }) => {
		if (url.pathname.match('/login')) {
			classes = 'top-1/2 bottom-0';
		} else {
			classes = 'top-0 bottom-1/2';
		}
	});
</script>

<div class={`absolute right-0 transition-[top,bottom] ${classes} left-0 bg-white/5 backdrop-blur-sm`} />
