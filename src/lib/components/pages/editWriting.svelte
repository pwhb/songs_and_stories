<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import Input from '$lib/components/common/input.svelte';
	import Toggle from '$lib/components/common/toggle.svelte';
	import { page } from '$app/stores';
	import Select from '../common/select.svelte';
	import { getUrl, parseFinishedDate, slugify } from '$lib/utils/formatters';

	import { Editor, Viewer } from 'bytemd';

	import gfm from '@bytemd/plugin-gfm';
	import DatePicker from '../common/datePicker.svelte';
	import Dropzone from '../common/dropzone.svelte';

	const { categories, songs, user } = $page.data;

	export let doc: any = {
		title: '',
		active: true,
		category: categories[0].value,
		song: songs[0].value,
		finishedAt: 'September 23, 2000',
		body: '',
		titleImage: '',
		author: user
	};
	export let create = false;
	const plugins = [
		gfm()
		// Add more plugins here
	];
	let { author, title, active, category, song, body, titleImage } = doc;
	let finishedAt = parseFinishedDate(doc.finishedAt);
	let loading = false;

	const changeTitleImage = (data: any) => {
		titleImage = getUrl(data.insertedId);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		loading = true;
		const url = create ? `/api/writings` : `/api/writings/${doc._id}`;

		const options = {
			method: create ? 'POST' : 'PATCH',
			body: JSON.stringify({
				title,
				active,
				category,
				song,
				finishedAt,
				author: author._id,
				slug: slugify(title),
				body,
				titleImage
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
	<div class="m-10">
		{#if titleImage}
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<!-- <div class="max-auto"> -->
			<img src={titleImage} class="mx-auto my-5 h-64 rounded-xl" alt="title image" />
			<!-- </div> -->
		{/if}
		<Dropzone label="upload title image" callback={changeTitleImage} />
		<Input
			name="titleImage"
			label="Title Image URL"
			placeholder="https://songsandstories.s3.us-east-005.backblazeb2.com/undraw_reading_time.svg"
			value={titleImage}
			disabled={true}
		/>
	</div>
	<Input name="author" label="Author" placeholder="" value={author.penName} disabled={true} />
	<Select name="category" label="Category" options={categories} bind:value={category} />
	<Select name="song" label="Song" options={songs} bind:value={song} />
	<DatePicker name="finishedAt" label="Finish Date" bind:value={finishedAt} />
	<div class="my-10">
		<Editor
			value={body}
			{plugins}

			placeholder="Once upon a time"
			on:change={(e) => {
				body = e.detail.value;
			}}
		/>
		<!-- <Viewer value={body} /> -->
	</div>
	<Toggle name="active" label="Active" bind:checked={active} />
	<div class="mt-6 form-control">
		<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
	</div>
</form>
