<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import Input from '$lib/components/common/input.svelte';
	import JsonEditorWithLabel from '$lib/components/common/jsonEditorWithLabel.svelte';
	export let doc: any = {
		name: '',
		details: {}
	};

	export let create = false;

	let { name, details } = doc;
	let loading = false;

	let content = {
		text: undefined,
		json: { ...details }
	};
	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;
		const url = create ? `/api/roles` : `/api/roles/${doc._id}`;
		const options = {
			method: create ? 'POST' : 'PATCH',
			body: JSON.stringify({ name, details: JSON.parse(content.text as any) })
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push(create ? 'Successfully Created!' : 'Successfully Updated!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			await invalidateAll();
		}
		loading = false;
		goto('/bean-noodle/roles');
	};
</script>

<form action="" on:submit={handleSubmit}>
	<Input name="name" label="Username" placeholder="anakin23" bind:value={name} />
	<JsonEditorWithLabel name="details" label="Role Editor" bind:content />
	<div class="form-control mt-6">
		<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
	</div>
</form>
