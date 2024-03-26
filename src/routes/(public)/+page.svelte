<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/layout/meta.svelte';
	import HappyBirthday from '$lib/components/pages/happyBirthday.svelte';
	import Home from '$lib/components/pages/home.svelte';
	import { getBirthdayPersons, getOneBirthdayPerson } from '$lib/utils/formatters';
	import dayjs from 'dayjs';

	const { config, birthdayConfig } = $page.data;
	const birthdayPersons = getBirthdayPersons(birthdayConfig.birthdays);

	const birthdayPerson = getOneBirthdayPerson(birthdayPersons);

	const metadata = birthdayPersons.length
		? {
				title: birthdayPerson.text,
				description: birthdayPerson.text,
				image: '/birthday-cake-svgrepo-com.svg',
				imageAlt: '/birthday-cake-svgrepo-com.svg',
				url: '',
				type: '',
				twitterCard: ''
		  }
		: config.metadata.home;
</script>

<Meta {metadata} />
{#if birthdayPersons.length}
	<HappyBirthday {birthdayPerson} />
{:else}
	<Home />
{/if}
