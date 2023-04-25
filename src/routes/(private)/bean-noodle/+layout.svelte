<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/common/breadcrumbs.svelte';
	import Searchbar from '$lib/components/common/searchbar.svelte';
	import { capitalize, checkIsAllowed, getPath } from '$lib/utils/formatters';

	let data: any[] = [];
	let hideMenus = false;
	// https://www.svgrepo.com/show/449889/save.svg
	const { user, privateConfig } = $page.data;
</script>

<div class="flex overflow-hidden px-10 gap-5">
	{#if hideMenus}
		<p>hidden</p>
	{:else}
		<!-- Sidebar -->
		<div class="card shadow-2xl flex flex-col w-64 min-h-[75vh] bg-base-100">
			<!-- Sidebar Header -->
			<div class="flex flex-col items-center mt-10">
				<h1 class="text-xl text-center font-bold text-primary-content w-64 mb-10">
					<a href="/bean-noodle">
						{user.username}
						<div class="badge badge-primary font-normal">{user.role.name}</div>
					</a>
				</h1>
				<ul class="menu w-56 p-5 gap-3">
					{#each $page.data.privateConfig.sidebarMenus as menu}
						{#if checkIsAllowed(user.role, menu.label)}
							<li class={menu.label === getPath($page.url.pathname) ? 'bordered' : ''}>
								<a href={menu.href}>
									<img class="w-6" src={menu.icon} alt={menu.label} />
									<span class="text-black font-medium text-lg capitalize">{menu.label}</span>
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</div>

			<!-- Sidebar Links -->
		</div>
	{/if}

	<!-- Content -->
	<div class="flex flex-col w-full overflow-y-auto">
		<div class="card w-full max-w-7xl mx-auto shadow-2xl bg-base-300">
			<Breadcrumbs />
			<div class="card-body">
				<slot />
			</div>
		</div>
	</div>
</div>
