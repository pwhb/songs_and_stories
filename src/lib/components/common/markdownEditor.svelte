<script>
	import { marked } from 'marked';

	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
</script>

<div class="flex flex-row gap-0">
	<div class="w-1/2 form-control">
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
	<div class="p-3 mt-8 mb-1 w-1/2 rounded-2xl border-2 shadow-md border-neutral-200 bg-base-100">
		{@html marked(value)}
	</div>
</div>
