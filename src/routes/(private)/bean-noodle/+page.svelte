<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import Input from '$lib/components/common/input.svelte';
	const { fullUser } = $page.data;
	let { firstName, lastName, username, penName, avatar } = fullUser;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const url = `/api/users`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify({ firstName, lastName, username, penName, avatar })
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push('Successfully Updated!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			await invalidateAll();
		}
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
					<span class="text-2xl">{firstName[0]}{lastName[0]}</span>
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
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit">Save</button>
	</div>
</form>
