<script>
	import { page } from '$app/stores';
	import { parseAvatarPlaceholder } from '$lib/utils/formatters';
	import { search } from '$lib/utils/stores';
	import AppName from './appName.svelte';

	const { config, user } = $page.data;
</script>

<div class="shadow-md md:px-10 navbar bg-base-100">
	<div class="flex-1">
		<AppName />
	</div>
	<div class="flex-none gap-2">
		{#if $page.url.pathname === '/stories'}
			<div class="w-48 md:w-auto form-control">
				<input type="text" placeholder="Search" bind:value={$search} class="input input-bordered" />
			</div>
		{/if}
		{#if user}
			<div class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					{#if user.avatar}
						<div class="avatar">
							<div class="w-10 rounded-full">
								<img src={user.avatar} class="bg-base-100" alt="avatar" />
							</div>
						</div>
					{:else}
						<div class="avatar placeholder">
							<div class="w-10 rounded-full bg-neutral-focus text-neutral-content">
								<span class="text-sm">{parseAvatarPlaceholder(user)}</span>
							</div>
						</div>
					{/if}
				</label>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="p-2 mt-3 w-52 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
				>
					{#if user}
						<li>
							<a class="justify-between" href="/bean-noodle">
								Logged in as
								<span class="badge">{user.username}</span>
							</a>
						</li>
					{/if}
					<li><a href="/bean-noodle/configs">Settings</a></li>
					{#if user}
						<li>
							<form action="/logout" method="POST">
								<button type="submit">Log out</button>
							</form>
						</li>
					{/if}
				</ul>
			</div>
		{/if}
	</div>
</div>
