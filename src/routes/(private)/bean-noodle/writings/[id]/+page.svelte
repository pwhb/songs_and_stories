<script lang="ts">
	import { page } from '$app/stores';
	import EditWriting from '$lib/components/pages/editWriting.svelte';
	const { doc } = $page.data;
</script>

<EditWriting {doc} />
