<script>
	import { page } from '$app/stores';
	import Dropzone from '$lib/components/common/dropzone.svelte';
	import FileUploader from '$lib/components/common/fileUploader.svelte';
</script>

<div class="px-10">
	<p>Home</p>

	<!-- <FileUploader /> -->
	<Dropzone label="Upload a song" />
</div>
