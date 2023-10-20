<script>
	import Icon from '$lib/components/ui/icon.svelte';
	import VscSettingsGear from 'svelte-icons-pack/vsc/VscSettingsGear';
</script>

<div class="w-full px-8 mt-6">
	<div class="flex items-start justify-start gap-7">
		<div class="w-64 space-y-5">
			<div class="flex items-center justify-start space-x-2">
				<Icon
					src={VscSettingsGear}
					class="border border-black/20 dark:border-white/20 rounded-full p-1.5"
				/>
				<span class="text-xl font-medium">Account Settings</span>
			</div>
			<div
				class="w-full flex flex-col border border-black/20 dark:border-white/20 divide-y divide-black/20 dark:divide-white/20 [&>*]:pl-5 [&>*]:py-2.5"
			>
				<a data-sveltekit-preload-data="tap" href="profile" class="hover:underline focus:underline">
					Personal info
				</a>
				<a
					data-sveltekit-preload-data="tap"
					href="security"
					class="hover:underline focus:underline"
				>
					Security
				</a>
				<a data-sveltekit-preload-data="tap" href="teams" class="hover:underline focus:underline">
					Teams
				</a>
				<a
					data-sveltekit-preload-data="tap"
					href="notifications"
					class="hover:underline focus:underline"
				>
					Notifications
				</a>
				<a
					data-sveltekit-preload-data="tap"
					href="connections"
					class="hover:underline focus:underline"
				>
					Connections
				</a>
			</div>
		</div>
		<div class="basis-full">
			<slot />
		</div>
	</div>
</div>
