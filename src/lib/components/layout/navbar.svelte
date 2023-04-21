<script>
	import { page } from '$app/stores';
	import AppName from './appName.svelte';

	const { config, user } = $page.data;
</script>

<div class="px-10 navbar bg-base-100">
	<div class="flex-1">
		<AppName />
	</div>
	<div class="flex-none gap-2">
		<div class="form-control">
			<input type="text" placeholder="Search" class="input input-bordered" />
		</div>
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<!-- svelte-ignore a11y-missing-attribute -->
					<img src="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg" />
				</div>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				{#if user}
					<li>
						<a class="justify-between" href="/">
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
	</div>
</div>
