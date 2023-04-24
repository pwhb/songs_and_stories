<script lang="ts">
	import { page } from '$app/stores';
	import EditSong from '$lib/components/pages/editSong.svelte';
	const { doc } = $page.data;
</script>

<EditSong {doc} />
