<script>
	export let name = '';
	export let placeholder = '';
	export let value = '';
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">Last Name</span>
	</label>
	<input type="password" {name} {placeholder} bind:value class="input input-bordered" />
</div>
