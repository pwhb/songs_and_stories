<script>
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let books = [
		'https://songsandstories.vercel.app/api/uploads/66028239211d7f76486905e5',
		'https://songsandstories.vercel.app/api/uploads/6602825c211d7f76486905e6',
		'https://songsandstories.vercel.app/api/uploads/66028289211d7f76486905e7',
		'https://songsandstories.vercel.app/api/uploads/660282a0211d7f76486905e8',
		'https://songsandstories.vercel.app/api/uploads/660282bf211d7f76486905e9',
		'https://songsandstories.vercel.app/api/uploads/660282d3211d7f76486905ea',
		'https://songsandstories.vercel.app/api/uploads/660282ee64bc5e67938ff44a',
		'https://songsandstories.vercel.app/api/uploads/6602830e64bc5e67938ff44b'
	];
	let activeIndex = 0;
	setInterval(() => {
		activeIndex = (activeIndex + 1) % books.length;
		//logic goes here
	}, 5000);
</script>

<div class="">
	{#each books as book, i}
		{#if activeIndex === i}
			<img
				transition:scale={{ delay: 250, duration: 300, easing: quintOut }}
				class="absolute mx-auto"
				src={book}
				width="500"
				height="300"
				alt=""
			/>
		{/if}
	{/each}
</div>
