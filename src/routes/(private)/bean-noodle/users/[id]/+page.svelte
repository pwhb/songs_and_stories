<script lang="ts">
	import { page } from '$app/stores';

	import EditUser from '$lib/components/pages/editUser.svelte';

	const { doc, roles } = $page.data;
</script>

<EditUser {doc} {roles} />
