<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { JSONEditor } from 'svelte-jsoneditor';

	const configNames = $page.data.docs.map((v: { name: any }) => v.name);

	let selected = 'main';

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
		const payload = JSON.parse(content.text as any);
		const url = `/api/configs/${payload.name}`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify(payload)
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			await invalidateAll();
		}
	};
</script>

<!-- <p class="text-3xl font-medium text-primary mb-10">Edit Config</p> -->
<div class="">
	<div class="text-center mb-5">
		<select class="select select-primary w-full max-w-xs" bind:value={selected}>
			{#each configNames as configName}
				<option value={configName}>{configName}</option>
			{/each}
		</select>
	</div>
	<form on:submit={handleSubmit}>
		<JSONEditor bind:content />
		<div class="text-center mt-10">
			<button class="btn btn-primary" type="submit">Submit</button>
		</div>
	</form>
</div>
