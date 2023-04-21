<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { JSONEditor } from 'svelte-jsoneditor';
	const { config } = $page.data;
	let content = {
		text: undefined, // can be used to pass a stringified JSON document instead
		json: {
			...config
		}
	};
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
	<form on:submit={handleSubmit}>
		<JSONEditor bind:content />
		<div class="text-center mt-10">
			<button class="btn btn-primary" type="submit">Submit</button>
		</div>
	</form>
</div>
