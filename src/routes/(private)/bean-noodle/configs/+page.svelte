<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import JsonEditorWithLabel from '$lib/components/common/jsonEditorWithLabel.svelte';
	import { toast } from '@zerodevx/svelte-toast';

	const configNames = $page.data.docs.map((v: { name: any }) => v.name);

	let selected = 'main';
	let loading = false;

	let content = {
		text: undefined,
		json: {}
	};

	const getSelectedDocument = (selected: string) => $page.data.map[selected];

	$: {
		content = {
			text: undefined,
			json: getSelectedDocument(selected)
		};
	}
	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		loading = true;

		console.log({ content });

		const payload = Object.keys(content.json).length
			? content.json
			: JSON.parse(content.text as any);
		const url = `/api/configs/${payload.name}`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify(payload)
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
	};
</script>

<!-- <p class="mb-10 text-3xl font-medium text-primary">Edit Config</p> -->
<div class="">
	<div class="mb-5 text-center">
		<select class="w-full max-w-xs select select-primary" bind:value={selected}>
			{#each configNames as configName}
				<option value={configName}>{configName}</option>
			{/each}
		</select>
	</div>
	<form on:submit={handleSubmit}>
		<!-- <JSONEditor bind:content /> -->
		<JsonEditorWithLabel label="Config Editor" name="config" bind:content />
		<div class="mt-10 text-center">
			<button class="btn btn-primary" type="submit" disabled={loading}>Save</button>
		</div>
	</form>
</div>
