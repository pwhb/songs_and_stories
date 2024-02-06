<script>
	import { marked } from 'marked';

	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let disabled = false;

	let hide = false;
	const toggle = () => {
		hide = !hide;
	};
</script>

<div class="flex flex-row gap-0">
	<div class="flex-1 form-control">
		<label class="label" for={name}>
			<span class="label-text">{label}</span>
		</label>
		<textarea
			{name}
			{disabled}
			{placeholder}
			rows={16}
			bind:value
			class="w-full textarea textarea-bordered"
		/>
	</div>
	<!-- {#if !hide}
		<div class="flex-1 p-3 mt-8 mb-1 rounded-2xl border-2 shadow-md border-neutral-200 bg-base-100">
			{@html marked(value)}
		</div>
	{/if}
	{#if hide}
		<button class="btn btn-xs btn-ghost btn-circle" on:click={toggle}>
			<img src="https://www.svgrepo.com/show/449732/expand-arrows.svg" class="w-2" alt="expand" />
		</button>
	{:else}
		<button class="btn btn-xs btn-ghost btn-circle" on:click={toggle}>
			<img src="https://www.svgrepo.com/show/449931/times.svg" class="w-2" alt="minimize" />
		</button>
	{/if} -->
</div>
