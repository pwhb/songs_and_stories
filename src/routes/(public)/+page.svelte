<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/layout/meta.svelte';
	import Home from '$lib/components/pages/home.svelte';

	const { config } = $page.data;

	const metadata = config.metadata.home;
</script>

<Meta {metadata} />

<Home />
