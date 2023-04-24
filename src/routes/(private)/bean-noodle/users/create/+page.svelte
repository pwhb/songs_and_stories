<script lang="ts">
	import { page } from '$app/stores';
	import EditUser from '$lib/components/pages/editUser.svelte';
	const { roles } = $page.data;
</script>

<EditUser create={true} {roles} />
