<script lang="ts">
	import { page } from '$app/stores';

	export let writing = { title: '', finishedAt: '', slug: '', body: '', titleImage: '' };
	const { title, finishedAt, slug, body, titleImage } = writing;
	const preview = body.slice(0, 255) + ' ...';
	const { config } = $page.data;
</script>

<div class="card md:card-side bg-base-100 shadow-xl my-10">
	<figure>
		<img
			class="md:h-96 bg-slate-200"
			src={titleImage ? titleImage : config.stories.defaultTitleImg}
			alt="Album"
		/>
	</figure>
	<div class="card-body max-w-xl">
		<h2 class="card-title">{title}</h2>
		<div class="badge badge-accent">
			{finishedAt}
		</div>
		{@html preview}
		<!-- {#if audio}
            <div class="text-info font-semibold mt-10">
                <a href={audio.youtube} class="lowercase" target="_blank">
                    🎵 {audio.title} - {audio.artist} 🎵
                </a>
            </div>
        {/if} -->

		<div class="card-actions justify-end">
			<a href={`/stories/${slug}`} class="btn btn-primary text-gray-100 lowercase">read</a>
		</div>
	</div>
</div>
