<script>
	export let name = '';

	export let value = '';
	export let label = '';
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<input type="password" {name} bind:value class="input input-bordered" />
</div>
