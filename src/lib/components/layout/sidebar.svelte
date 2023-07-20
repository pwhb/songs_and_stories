<script>
	import { page } from '$app/stores';
	import { checkIsAllowed, getPath } from '$lib/utils/formatters';
	import SidebarToggle from '../common/sidebarToggle.svelte';
	const { user } = $page.data;
</script>

<!-- Sidebar -->
<div class="card shadow-2xl flex flex-col w-64 min-h-[75vh] bg-base-100">
	<!-- Sidebar Header -->
	<div class="flex flex-col items-center mt-10">
		<h1 class="mb-10 w-64 text-xl font-bold text-center text-primary-content">
			<a href="/bean-noodle">
				{user.username}
				<div class="font-normal badge badge-primary">{user.role.name}</div>
			</a>
		</h1>
		<ul class="gap-3 p-5 w-56 menu">
			{#each $page.data.privateConfig.sidebarMenus as menu}
				{#if checkIsAllowed(user.role, menu.label)}
					<li class={menu.label === getPath($page.url.pathname) ? 'bordered' : ''}>
						<a href={menu.href}>
							<img class="w-6" src={menu.icon} alt={menu.label} />
							<span class="text-lg font-medium text-black capitalize">{menu.label}</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>

	<!-- Sidebar Links -->
</div>
