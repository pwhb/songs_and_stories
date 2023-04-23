<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import Input from '$lib/components/common/input.svelte';
	import PasswordInput from '$lib/components/common/passwordInput.svelte';
	import Select from '$lib/components/common/select.svelte';

	const { roles } = $page.data;
	let loading = false;
	const options = roles.map((v: string) => {
		return { label: v, value: v };
	});
	let firstName = '',
		lastName = '',
		username = '',
		penName = '',
		password = '',
		avatar = '',
		role = '';

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const url = `/api/users`;
		const options = {
			method: 'POST',
			body: JSON.stringify({ firstName, lastName, username, penName, role, avatar, password })
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push('Successfully Created!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			await invalidateAll();
		}
		loading = false;
		goto("/bean-noodle/users")
	};
</script>

<form action="" on:submit={handleSubmit}>
	<div class="text-center mb-10">
		{#if avatar}
			<div class="avatar">
				<div class="w-24 rounded-full">
					<img src={avatar} class="bg-base-100" alt="avatar" />
				</div>
			</div>
		{:else}
			<div class="avatar placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full w-24">
					<span class="text-2xl">?</span>
				</div>
			</div>
		{/if}
	</div>
	<div class="grid grid-cols-2 gap-4">
		<Input name="firstName" label="First Name" placeholder="Anakin" bind:value={firstName} />
		<Input name="lastName" label="Last Name" placeholder="Skywalker" bind:value={lastName} />
	</div>

	<Input name="username" label="Username" placeholder="anakin23" bind:value={username} />
	<Input name="penName" label="Pen Name" placeholder="anakin23" bind:value={penName} />
	<Input
		name="avatar"
		label="Avatar URL"
		placeholder="https://www.svgrepo.com/show/509009/avatar-thinking-3.svg"
		bind:value={avatar}
	/>
	<Select label="Role" name="role" {options} bind:value={role} />
	<PasswordInput name="password" label="Password" bind:value={password} />
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>Submit</button>
	</div>
</form>
