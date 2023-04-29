<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/layout/meta.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { getPreview, parsePublicDate } from '$lib/utils/formatters';
	import { search } from '$lib/utils/stores';

	const { docs, config } = $page.data;

	let filteredResults: any = docs;
	console.log('search', docs);

	$: {
		filteredResults = filterResults($search, docs, ['title', 'body']);
	}
	const metadata = {
		title: 'stories',
		description: 'hello friend, do you like stories?',
		image: config.hero.img,
		imageAlt: '',
		url: '',
		type: '',
		twitterCard: ''
	};
</script>

<Meta {metadata} />
<div class="flex flex-col max-w-4xl mx-auto p-10 gap-10">
	{#each filteredResults as { title, author, finishedAt, song, slug, body, titleImage }, idx}
		<div class={idx % 2 == 0 ? 'flex justify-start' : 'flex justify-end'}>
			<div class="card md:card-side p-5 bg-base-100 shadow-xl max-w-xl">
				<figure class="bg-slate-200 w-sm">
					<img
						class=""
						src={titleImage ? titleImage : config.stories.defaultTitleImg}
						alt="Album"
					/>
				</figure>
				<div class="card-body max-w-md">
					<h2 class="card-title">{title}</h2>
					<div class="flex flex-row gap-3">
						<div class="badge badge-primary">
							{author.penName}
						</div>
						<div class="badge badge-accent">
							{parsePublicDate(finishedAt)}
						</div>
					</div>
					{@html getPreview(body)}
					{#if song}
						<div class="text-info font-semibold mt-3">
							<a href={song.youtube} class="lowercase" target="_blank">
								🎵 {song.title} - {song.artist} 🎵
							</a>
						</div>
					{/if}
					<div class="card-actions justify-end">
						<a href={`/stories/${slug}`} class="btn btn-primary text-gray-100 lowercase">read</a>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
