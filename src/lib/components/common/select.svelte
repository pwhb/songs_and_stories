<script lang="ts">
	export let name = '';
	export let label = '';
	export let options: any[] = [];
	export let value = '';
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>

	<select class="select select-bordered w-full" bind:value {name}>
		{#each options as { label, value }}
			<option {value}>{label}</option>
		{/each}
	</select>
</div>
