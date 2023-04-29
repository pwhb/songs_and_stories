<script lang="ts">
	import Input from './input.svelte';
	import Select from './select.svelte';

	export let details: any;
	const parseArrayFromObject = (object: any) => {
		const arr = [];
		for (let key of Object.keys(object)) {
			arr.push({ key, value: object[key] });
		}
		return arr;
	};

	const parseObjectFromArray = (array: any[]) => {
		const obj: any = {};
		for (let { key, value } of array) {
			obj[key] = value;
		}
		return obj;
	};

	const data = parseArrayFromObject(details);
	const options = [
		{
			label: 'private',
			value: 'private'
		},
		{
			label: 'all',
			value: 'all'
		}
	];
</script>

<div>
	{#each data as { key, value }}
		<div class="grid grid-cols-2 gap-4">
			<Input name={key} label="Permission" placeholder="Anakin" bind:value={key} />
			<Select name={`select-${key}`} label="Access" {options} bind:value />
		</div>
	{/each}
</div>
