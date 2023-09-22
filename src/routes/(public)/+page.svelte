<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/layout/meta.svelte';
	import HappyBirthday from '$lib/components/pages/happyBirthday.svelte';
	import Home from '$lib/components/pages/home.svelte';

	const { config } = $page.data;

	const now = new Date();

	const isBirthday =
		now.getDate() === config.nwh_bd.date && now.getMonth() + 1 === config.nwh_bd.month;

	console.log({
		now,
		'now.getDate()': now.getDate(),
		'now.getMonth()': now.getMonth(),
		'config.nwh_bd.date': config.nwh_bd.date,
		'config.nwh_bd.month': config.nwh_bd.month,
		isBirthday
	});

	const metadata = isBirthday ? config.metadata.hbd_nwh : config.metadata.home;
</script>

<Meta {metadata} />

{#if isBirthday}
	<HappyBirthday />
{:else}
	<Home />
{/if}
