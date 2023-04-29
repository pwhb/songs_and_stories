<script lang="ts">
	import { page } from '$app/stores';
	import StoryCard from '$lib/components/pages/storyCard.svelte';

	const { writings, config } = $page.data;
	// console.log(writings, config);
</script>

<div class="flex flex-col">
	{#each writings as writing}}
		<!-- <StoryCard {writing} /> -->
	{/each}
</div>
