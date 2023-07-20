<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { toast } from '@zerodevx/svelte-toast';
	import Input from '$lib/components/common/input.svelte';
	import Toggle from '$lib/components/common/toggle.svelte';
	import MusicPlayer from '$lib/components/common/musicPlayer.svelte';
	import Dropzone from '../common/dropzone.svelte';
	import { getUrl } from '$lib/utils/formatters';

	export let doc: any = {
		src: '',
		title: '',
		artist: '',
		youtube: '',
		active: true,
		thumbnail: ''
	};
	export let create = false;

	let loading = false;
	let { src, title, artist, youtube, active, thumbnail } = doc;

	const changeSongSrc = (data: any) => {
		src = getUrl(data.insertedId);
	};

	const changeThumbnail = (data: any) => {
		thumbnail = getUrl(data.insertedId);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const url = create ? `/api/songs` : `/api/songs/${doc._id}`;
		const options = {
			method: create ? 'POST' : 'PATCH',
			body: JSON.stringify({ src, title, artist, youtube, active, thumbnail })
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
		goto('/bean-noodle/songs');
	};
</script>

<MusicPlayer {title} {artist} {src} {thumbnail} />
<form action="" on:submit={handleSubmit}>
	<Input name="title" label="Title" placeholder="Fly Me To The Moon" bind:value={title} />
	<Input name="artist" label="Artist" placeholder="Frank Sinatra" bind:value={artist} />

	<div class="m-10">
		<Dropzone label="upload song" callback={changeSongSrc} />
	</div>
	<Input
		disabled={true}
		name="src"
		label="Song URL"
		placeholder="Fly Me To The Moon"
		bind:value={src}
	/>
	<div class="m-10">
		<Dropzone label="upload thumbnail" callback={changeThumbnail} />
	</div>
	<Input
		disabled={true}
		name="thumbnail"
		label="Thumbnail URL"
		placeholder="Fly Me To The Moon"
		bind:value={thumbnail}
	/>
	<Input
		name="youtube"
		label="YouTube URL"
		placeholder="https://www.youtube.com/watch?v=ZEcqHA7dbwM"
		bind:value={youtube}
	/>
	<Toggle name="active" label="Active" bind:checked={active} />
	<div class="mt-6 form-control">
		<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
	</div>
</form>
