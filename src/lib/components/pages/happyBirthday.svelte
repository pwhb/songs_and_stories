<script lang="ts">
	import NavButtons from '../layout/navButtons.svelte';

	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let birthdayPerson: any;

	const carouselPhotos = birthdayPerson.images;

	let i = 0;
	function next() {
		i = (i + 1) % carouselPhotos.length;
	}

	let timer: any;
	onMount(() => {
		let timer = setInterval(next, 5000);
	});
	onDestroy(() => {
		clearInterval(timer);
	});

	$: src = carouselPhotos[i];
</script>

<div
	class="min-h-[75vh] hero"
	style={`background-image: url(https://songsandstories.vercel.app/api/uploads/66027a3483840785e6728812);`}
>
	<div class="bg-opacity-30 hero-overlay" />
	<div class="flex flex-col h-[75vh] items-center justify-center gap-5">
		<h1
			class="mb-5 max-w-md lowercase text-5xl font-bold [text-shadow:_0_6px_0_rgb(0_0_0_/_40%)] text-neutral-content text-center"
		>
			{birthdayPerson.text}
		</h1>
		{#if carouselPhotos.length}
			{#key src}
				<img
					transition:slide={{ delay: 200, duration: 500 }}
					{src}
					alt=""
					class="object-cover p-10 mx-auto h-96 bg-white rounded-md shadow-lg"
				/>
			{/key}
		{/if}

		<NavButtons />
	</div>
</div>
