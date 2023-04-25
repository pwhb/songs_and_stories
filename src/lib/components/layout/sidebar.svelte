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
