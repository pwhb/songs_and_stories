<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/common/breadcrumbs.svelte';
	import SidebarToggle from '$lib/components/common/sidebarToggle.svelte';
	import Sidebar from '$lib/components/layout/sidebar.svelte';
	import { checkIsAllowed, getPath } from '$lib/utils/formatters';

	let hide = false;
	// https://www.svgrepo.com/show/449889/save.svg
	const { user } = $page.data;
</script>

<div class="flex overflow-hidden px-10 gap-5">
	{#if hide}
		<SidebarToggle bind:hide />
	{:else}
		<div class=" left-64 top-18 z-10 absolute">
			<SidebarToggle bind:hide />
		</div>

		<Sidebar />
	{/if}
	{#if hide}
		<!-- Content -->
		<div class="flex flex-col w-full overflow-y-auto">
			<div class="card w-full mx-auto shadow-2xl bg-base-300">
				<Breadcrumbs />
				<div class="card-body">
					<slot />
				</div>
			</div>
		</div>
	{:else}
		<!-- Content -->
		<div class="flex flex-col w-full overflow-y-auto">
			<div class="card w-full max-w-7xl mx-auto shadow-2xl bg-base-300">
				<Breadcrumbs />
				<div class="card-body">
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>
