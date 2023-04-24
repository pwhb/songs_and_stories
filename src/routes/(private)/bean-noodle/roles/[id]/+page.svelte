<script lang="ts">
	import { page } from '$app/stores';
	import EditRole from '$lib/components/pages/editRole.svelte';
	const { doc } = $page.data;
</script>

<EditRole {doc} />
