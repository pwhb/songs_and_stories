<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import Dropzone from '../common/dropzone.svelte';
	import Input from '../common/input.svelte';
	import Select from '../common/select.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import PasswordInput from '../common/passwordInput.svelte';
	export let doc: any = {
		firstName: '',
		lastName: '',
		username: '',
		penName: '',
		avatar: '',
		role: 'author'
	};
	export let roles: any = [];
	export let create = false;
	export let showRole = true;

	let loading = false;
	const options = roles.map((v: string) => {
		return { label: v, value: v };
	});

	const changeAvatar = (urls: any) => {
		avatar = urls[0];
	};

	let { firstName, lastName, username, penName, avatar, role } = doc;
	let password = '';
	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const url = create ? `/api/users` : `/api/users/${doc._id}`;
		const options = {
			method: create ? 'POST' : 'PATCH',
			body: JSON.stringify({ firstName, lastName, username, penName, avatar, role, password })
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', { classes: ['info'] });
			await invalidateAll();
		} else {
			toast.push(data.error && data.error.message ? data.error.message : 'Failed.', {
				classes: ['warn']
			});
		}
		loading = true;
		goto('/bean-noodle/users');
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
					<span class="text-2xl">{firstName && lastName ? firstName[0] + lastName[0] : ''}</span>
				</div>
			</div>
		{/if}
	</div>
	<div class="m-10">
		<Dropzone label="upload avatar" handleUpdateUrls={changeAvatar} />
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
		value={avatar}
		disabled={true}
	/>
	{#if showRole}
		<Select label="Role" name="role" {options} bind:value={role} />
	{/if}
	{#if create}
		<PasswordInput name="password" label="Password" bind:value={password} />
	{/if}
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
	</div>
</form>
