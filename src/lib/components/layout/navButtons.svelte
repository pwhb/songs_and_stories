<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-row gap-3 justify-center">
	{#each $page.data.config.hero.btns as { txt, URL }}
		<a href={URL} class="lowercase btn-xs md:btn-sm btn btn-secondary">{txt}</a>{/each}
</div>
