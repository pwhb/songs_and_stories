<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/layout/meta.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { getPreview, parsePublicDate } from '$lib/utils/formatters';
	import { search } from '$lib/utils/stores';

	const { docs, config } = $page.data;

	let filteredResults: any = docs;

	$: {
		filteredResults = filterResults($search, docs, ['title', 'body']);
	}

	const metadata = {
		title: $page.url.pathname === '/stories' ? 'stories' : 'not stories',
		description:
			$page.url.pathname === '/stories'
				? 'hello friend, do you like stories?'
				: 'hello friend, do you like reading?',
		image: config.hero.img,
		imageAlt: '',
		url: '',
		type: '',
		twitterCard: ''
	};
</script>

<Meta {metadata} />
<div class="flex flex-col gap-10 p-2 mx-auto max-w-4xl md:p-10">
	{#each filteredResults as { title, author, finishedAt, song, slug, body, titleImage }, idx}
		<div class={idx % 2 == 0 ? 'flex justify-start' : 'flex justify-end'}>
			<div class="p-3 max-w-xl shadow-xl md:p-5 card md:card-side bg-base-100">
				<figure class="bg-slate-200 w-sm">
					<img
						class=""
						src={titleImage ? titleImage : config.stories.defaultTitleImg}
						alt="Album"
					/>
				</figure>
				<div class="max-w-lg sm:max-w-xl card-body">
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
						<div class="mt-3 font-semibold text-info">
							<a href={song.youtube} class="lowercase" target="_blank">
								🎵 {song.title} - {song.artist} 🎵
							</a>
						</div>
					{/if}
					<div class="justify-end card-actions">
						<a href={`/stories/${slug}`} class="text-gray-100 lowercase btn btn-primary">read</a>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
