<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import Input from '$lib/components/common/input.svelte';
	import Toggle from '$lib/components/common/toggle.svelte';
	import { page } from '$app/stores';
	import Select from '../common/select.svelte';
	import { slugify } from '$lib/utils/formatters';
	import { DateInput } from 'date-picker-svelte';
	import DatePicker from '../common/datePicker.svelte';

	const { categories, songs, user } = $page.data;

	export let doc: any = {
		title: '',
		active: true,
		category: categories[0].value,
		song: songs[0].value,
		finishedAt: 'September 23, 2000'
	};
	export let create = false;
	let { title, active, category, song, finishedAt } = doc;
	let loading = false;
	console.log('$page.data', $page.data);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		console.log(create);

		// console.log({
		// 	title,
		// 	active,
		// 	category,
		// 	song,
		// 	finishedAt: new Date(finishedAt),
		// 	author: user._id,
		// 	slug: slugify(title)
		// });

		loading = true;
		const url = create ? `/api/writings` : `/api/writings/${doc._id}`;
		const options = {
			method: create ? 'POST' : 'PATCH',
			body: JSON.stringify({
				title,
				active,
				category,
				song,
				finishedAt: new Date(finishedAt),
				author: user._id,
				slug: slugify(title)
			})
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', { classes: ['info'] });
			await invalidateAll();
		} else {
			toast.push(data.error && data.error.message ? data.error.message : 'Failed.', {
				classes: ['warn']
			});
		}
		loading = false;
		goto('/bean-noodle/writings');
	};
</script>

<form action="" on:submit={handleSubmit}>
	<Input
		name="title"
		label="Title"
		placeholder="(Let me kiss you) at the funeral of the gods"
		bind:value={title}
	/>
	<Select name="category" label="Category" options={categories} bind:value={category} />
	<Select name="song" label="Song" options={songs} bind:value={song} />
	<DatePicker name="finishedAt" label="Finish Date" bind:value={finishedAt} />
	<Toggle name="active" label="Active" bind:checked={active} />
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
	</div>
</form>
