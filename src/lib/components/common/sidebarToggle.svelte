<script>
	export let hide = false;

	const toggle = () => {
		hide = !hide;
	};
</script>

{#if hide}
	<button class="btn btn-sm btn-circle btn-outline" on:click={toggle}>
		<img src="https://www.svgrepo.com/show/449732/expand-arrows.svg" class="w-4" alt="expand" />
	</button>
{:else}
	<button class="btn btn-xs btn-ghost btn-circle" on:click={toggle}>
		<img src="https://www.svgrepo.com/show/449931/times.svg" class="w-2" alt="minimize" />
	</button>
{/if}
