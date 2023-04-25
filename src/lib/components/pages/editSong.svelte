<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { toast } from '@zerodevx/svelte-toast';
	import Input from '$lib/components/common/input.svelte';
	import Toggle from '$lib/components/common/toggle.svelte';
	import MusicPlayer from '$lib/components/common/musicPlayer.svelte';
	import Dropzone from '../common/dropzone.svelte';

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

	const changeSongSrc = (urls: any) => {
		src = urls[0];
	};

	const changeThumbnail = (urls: any) => {
		thumbnail = urls[0];
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
		<Dropzone label="upload song" handleUpdateUrls={changeSongSrc} />
	</div>
	<Input
		disabled={true}
		name="src"
		label="Song URL"
		placeholder="Fly Me To The Moon"
		bind:value={src}
	/>
	<div class="m-10">
		<Dropzone label="upload thumbnail" handleUpdateUrls={changeThumbnail} />
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
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
	</div>
</form>
