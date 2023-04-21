<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/common/breadcrumbs.svelte';
	import { capitalize } from '$lib/utils/formatters';

	let data: any[] = [];
	// https://www.svgrepo.com/show/449889/save.svg
	const { user } = $page.data;

	const sidebarMenus = [
		{
			icon: 'https://www.svgrepo.com/show/449685/cog.svg',
			label: 'config',
			href: '/bean-noodle/configs'
		},
		{
			icon: 'https://www.svgrepo.com/show/449959/users.svg',
			label: 'users',
			href: '/bean-noodle/users'
		},
		{
			icon: 'https://www.svgrepo.com/show/449778/headset.svg',
			label: 'songs',
			href: '/bean-noodle/songs'
		},
		{
			icon: 'https://www.svgrepo.com/show/449744/file.svg',
			label: 'writings',
			href: '/bean-noodle/writings'
		}
	];
</script>

<div class="flex overflow-hidden">
	<!-- Sidebar -->
	<div class="flex flex-col w-64 bg-base-200">
		<!-- Sidebar Header -->
		<div class="flex flex-col items-center mt-10">
			<h1 class="text-xl text-center font-bold text-primary w-64 mb-10">
				{user.username} ({user.role})
			</h1>
			<ul class="menu w-56 p-5 gap-3">
				{#each sidebarMenus as menu}
					<li>
						<a href={menu.href}>
							<img class="w-6" src={menu.icon} alt={menu.label} />
							<span class="text-black font-medium text-lg">{menu.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Sidebar Links -->
	</div>

	<!-- Content -->
	<div class="flex flex-col w-full overflow-y-auto">
		<Breadcrumbs />
		<slot />
	</div>
</div>
