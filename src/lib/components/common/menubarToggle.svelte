<script>
	export let hideMenus = false;

	const toggle = () => {
		hideMenus = !hideMenus;
	};
</script>

{#if hideMenus}
	<button class="btn btn-sm btn-circle btn-outline" on:click={toggle}>
		<img src="https://www.svgrepo.com/show/449732/expand-arrows.svg" class="w-4" alt="expand" />
	</button>
{:else}
	<button class="btn btn-xs btn-circle btn-outline" on:click={toggle}>
		<img src="https://www.svgrepo.com/show/449931/times.svg" class="w-3" alt="minimize" />
	</button>
{/if}
