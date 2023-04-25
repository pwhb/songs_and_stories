<script lang="ts">
	export let search = '';
</script>

<div class="form-control max-w-xs ml-auto mb-3">
	<input type="text" placeholder="Search" class="input input-bordered" bind:value={search} />
</div>
<div class="overflow-x-auto">
	<table class="table w-full">
		<slot />
	</table>
</div>
