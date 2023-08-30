<script lang="ts">
	import { audioStore } from '$lib/utils/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount, onDestroy } from 'svelte';

	export let title = '';
	export let artist = '';
	export let thumbnail = '';
	export let src = '';

	const defaultThumbnail =
		'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2019/07/fly_me_to_the_moon_poster/19490935-1-eng-GB/Fly_me_to_the_Moon_poster_pillars.jpg';

	const playIcon = 'https://www.svgrepo.com/show/499775/play.svg';
	const pauseIcon = 'https://www.svgrepo.com/show/499769/pause.svg';

	let isPlaying = false;
	let audio: HTMLAudioElement;

	onMount(() => {
		audio = new Audio(src);
	});

	const toggleMusic = () => {
		isPlaying = !isPlaying;
		if (isPlaying) {
			audio.play();
		} else {
			audio.pause();
		}
	};

	onDestroy(() => {
		if (audio) {
			audio.src = '';
			if (isPlaying) {
				toast.push('Music stopped.', {
					classes: ['warn']
				});
			}
		}
	});
</script>

<div class="p-5 mx-auto max-w-md shadow-xl card card-side bg-base-100">
	<div class="flex flex-row gap-6 mx-2 w-full card">
		<div class="flex">
			<img
				class={isPlaying
					? 'bg-base-300 h-16 w-16 object-contain rounded-2xl ring ring-blue-400 ring-offset-base-100 ring-offset-2'
					: 'bg-base-300 h-16 w-16 object-contain rounded-2xl ring ring-gray-200 ring-offset-base-100 ring-offset-2'}
				src={thumbnail ? thumbnail : defaultThumbnail}
				alt=""
			/>
		</div>
		<div class="flex flex-col flex-1 my-4">
			<p
				class={isPlaying ? 'font-bold text-sm text-primary truncate' : 'font-bold text-xs truncate'}
			>
				{title}
			</p>
			<p class="text-xs font-thin">{artist}</p>
		</div>
		<div class="flex">
			<button on:click={toggleMusic}>
				<img class="w-12" src={isPlaying ? pauseIcon : playIcon} alt="" />
			</button>
		</div>
	</div>
</div>
