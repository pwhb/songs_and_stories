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

<div class="flex overflow-hidden gap-5 p-3 lg:p-10">
	{#if hide}
		<div class="fixed z-10">
			<SidebarToggle bind:hide />
		</div>
	{:else}
		<div class="fixed z-10">
			<SidebarToggle bind:hide />
		</div>

		<Sidebar />
	{/if}
	{#if hide}
		<!-- Content -->
		<div class="flex overflow-y-auto flex-col w-full">
			<div class="mx-auto w-full shadow-2xl card bg-base-300">
				<Breadcrumbs />
				<div class="card-body">
					<slot />
				</div>
			</div>
		</div>
	{:else}
		<!-- Content -->
		<div class="flex overflow-y-auto flex-col w-full">
			<div class="mx-auto w-full max-w-7xl shadow-2xl card bg-base-300">
				<Breadcrumbs />
				<div class="card-body">
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>
