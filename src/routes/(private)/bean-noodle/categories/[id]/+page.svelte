<script lang="ts">
	import { page } from '$app/stores';
	import EditCategory from '$lib/components/pages/editCategory.svelte';
	const { doc } = $page.data;
</script>

<EditCategory {doc} />
