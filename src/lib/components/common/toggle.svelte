<script lang="ts">
	export let name = '';
	export let label = '';
	export let checked = true;
</script>

<div class="form-control max-w-sm my-3">
	<label class="label cursor-pointer" for={name}>
		<span class="label-text">{label}</span>
		<input {name} type="checkbox" class="toggle" bind:checked />
	</label>
</div>
