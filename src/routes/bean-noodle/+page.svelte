<script lang="ts">
	import { page } from '$app/stores';
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
		<!-- Table Header -->
		<div class="grid grid-cols-4 gap-4 px-6 py-4 bg-base-200 border-b border-gray-200">
			<div class="font-bold text-gray-800 uppercase">Name</div>
			<div class="font-bold text-gray-800 uppercase">Email</div>
			<div class="font-bold text-gray-800 uppercase">Role</div>
			<div class="font-bold text-gray-800 uppercase">Actions</div>
		</div>

		<!-- Table Rows -->
		<div class="grid grid-cols-4 gap-4 px-6 py-4 bg-base-200">
			{#each data as item}
				<div class="text-gray-800">{item.name}</div>
				<div class="text-gray-800">{item.email}</div>
				<div class="text-gray-800">{item.role}</div>
				<div class="flex space-x-2">
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Edit
					</button>

					<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
						Delete
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.bg-blue-500 {
		background-color: #3b82f6;
	}

	.bg-blue-700 {
		background-color: #2563eb;
	}

	.bg-red-500 {
		background-color: #ef4444;
	}

	.bg-red-700 {
		background-color: #dc2626;
	}
</style>
