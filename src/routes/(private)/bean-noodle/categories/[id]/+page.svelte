<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import Input from '$lib/components/common/input.svelte';
	import Toggle from '$lib/components/common/toggle.svelte';

	const { doc } = $page.data;
	let { name, active } = doc;
	let loading = false;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const url = `/api/categories/${doc._id}`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify({ name, label: name, value: name, active })
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
		loading = false;
		goto('/bean-noodle/categories');
	};
</script>

<form action="" on:submit={handleSubmit}>
	<Input name="name" label="Name" placeholder="fiction" bind:value={name} />
	<Toggle name="active" label="Active" bind:checked={active} />
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>Submit</button>
	</div>
</form>
