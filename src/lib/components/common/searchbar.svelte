<script lang="ts">
	export let search = '';
</script>

<div class="form-control max-w-xs ml-auto">
	<input type="text" placeholder="Search" class="input input-bordered" bind:value={search} />
</div>
