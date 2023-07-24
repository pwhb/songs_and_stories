<script lang="ts">
	export let search = '';
</script>

<div class="mb-3 ml-auto max-w-xs form-control">
	<input type="text" placeholder="Search" class="input input-bordered" bind:value={search} />
</div>
<div class="overflow-x-auto">
	<table class="table w-full">
		<slot />
	</table>
</div>
