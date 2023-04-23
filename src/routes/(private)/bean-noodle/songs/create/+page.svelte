<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import Input from '$lib/components/common/input.svelte';
	import Toggle from '$lib/components/common/toggle.svelte';

	const { doc } = $page.data;
	let loading = false;
	let src = '',
		title = '',
		artist = '',
		youtube = '',
		thumbnail = '',
		active = true;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const url = `/api/songs`;
		const options = {
			method: 'POST',
			body: JSON.stringify({ src, title, artist, youtube, active, thumbnail })
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push('Successfully Updated!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			await invalidateAll();
		}
		loading = false;
		goto("/bean-noodle/songs")
	};
</script>

<form action="" on:submit={handleSubmit}>
	<Input name="title" label="Title" placeholder="Fly Me To The Moon" bind:value={title} />
	<Input name="artist" label="Artist" placeholder="Frank Sinatra" bind:value={artist} />
	<Input
		name="src"
		label="Song URL"
		placeholder="https://github.com/pwhb/public/blob/main/music/dandelion%20hands%20-%20lonely-kdRw1m8J3Uo.m4a?raw=true"
		bind:value={src}
	/>
	<Input
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
		<button class="btn btn-primary" type="submit" disabled={loading}>Submit</button>
	</div>
</form>
