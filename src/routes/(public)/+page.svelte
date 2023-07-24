<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/layout/meta.svelte';
	import NavButtons from '$lib/components/layout/navButtons.svelte';

	const { config } = $page.data;
	const metadata = config.metadata.home;
</script>

<Meta {metadata} />
<div class="min-h-[75vh] hero" style={`background-image: url(${config.hero.img});`}>
	<div class="bg-opacity-40 hero-overlay" />
	<div class="text-center hero-content text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">{config.hero.title}</h1>
			<p class="mb-5 max-w-xs text-2xl text-primary">
				{config.hero.txt}
			</p>
			<NavButtons />
		</div>
	</div>
</div>
