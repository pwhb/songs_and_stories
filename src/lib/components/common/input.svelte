<script>
	export let name = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<input type="text" {name} {placeholder} bind:value class="input input-bordered" />
</div>
