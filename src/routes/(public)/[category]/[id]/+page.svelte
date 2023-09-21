<script lang="ts">
	import { page } from '$app/stores';
	import MusicPlayer from '$lib/components/common/musicPlayer.svelte';
	import Meta from '$lib/components/layout/meta.svelte';
	import NavButtons from '$lib/components/layout/navButtons.svelte';
	import { parsePublicDate } from '$lib/utils/formatters';
	import { marked } from 'marked';

	const { doc, config } = $page.data;
	const { title, author, finishedAt, song, slug, body, titleImage } = doc;
	const metadata = {
		...config.metadata.slug,
		title: title,
		description: body.slice(0, 255),
		image: titleImage || config.stories.defaultTitleImg,
		imageAlt: titleImage || config.stories.defaultTitleImg
	};
</script>

<Meta {metadata} />
<div class="mx-auto max-w-4xl">
	<section class="p-4 md:p-10 md:text-xl">
		<div class="mb-10 text-center">
			<h1 class="mb-10 text-2xl font-bold text-primary">{title}</h1>
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
				class="p-1 mx-auto mb-10 h-96 rounded-md shadow-md bg-slate-200"
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
		<div class="divider" />

		{@html marked(body).replace(/\n/g, '<br>')}
		<div class="divider" />
		<NavButtons />
	</section>
</div>
