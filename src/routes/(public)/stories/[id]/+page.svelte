<script lang="ts">
	import { page } from '$app/stores';
	import MusicPlayer from '$lib/components/common/musicPlayer.svelte';
	import { parsePublicDate } from '$lib/utils/formatters';
	import { marked } from 'marked';

	const { doc } = $page.data;
	const { title, author, finishedAt, song, slug, body, titleImage } = doc;
</script>

<div class="max-w-4xl mx-auto">
	<section class="p-10 md:text-xl">
		<div class="mb-10 text-center">
			<h1 class="text-primary font-bold text-2xl mb-10">{title}</h1>
			<div class="flex flex-row gap-3 justify-center">
				<div class="badge badge-primary">
					{author.penName}
				</div>
				<div class="badge badge-accent">
					{parsePublicDate(finishedAt)}
				</div>
			</div>
		</div>
		{#if titleImage}
			<img
				class="mb-10 rounded-md p-1 h-96 bg-slate-200 mx-auto shadow-md"
				src={titleImage}
				alt={`image for ${title}`}
			/>
		{/if}

		{#if song}
			<div class="my-10">
				<MusicPlayer
					title={song.title}
					artist={song.artist}
					src={song.src}
					thumbnail={song.thumbnail}
				/>
			</div>
		{/if}

		{@html marked(body).replace(/\n/g, '<br>')}
	</section>
</div>
