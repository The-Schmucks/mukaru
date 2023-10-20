<script lang="ts">
	export let name: string;
	export let label: string;
</script>

<label for={name} class="text-black/80 dark:text-white/80">
	{label}
</label>
