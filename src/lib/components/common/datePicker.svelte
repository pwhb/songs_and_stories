<script>
	import SveltyPicker from 'svelty-picker';
	export let name = '';
	export let label = '';
	export let value = 'September 23, 2000';
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<!-- <DateInput format="yyyy-MM-dd" bind:value /> -->
	<SveltyPicker inputClasses="input input-bordered" format="MM d, yyyy" bind:value />
</div>
