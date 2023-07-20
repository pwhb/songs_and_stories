<script lang="ts">
	import FileDrop from 'filedrop-svelte';
	import type { Files } from 'filedrop-svelte';
	import LoadingSpinner from './loadingSpinner.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	let files: Files;
	export let label = 'Upload files';
	export let loading = false;

	export let callback = (data: any) => {};
	const handleUpload = async (file: any) => {
		loading = true;
		const formData = new FormData();
		formData.append('file', file);
		const url = '/api/uploads';
		const res = await fetch(url, {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		loading = false;
		return data;
	};

	const handleDrop = async (e: any) => {
		files = e.detail.files;
		const file = files.accepted[0];
		if (file) {
			const { success, data } = await handleUpload(file);
			if (success) {
				toast.push('Successfully Uploaded!', {
					classes: ['info']
				});
				callback(data);
			}
		}
	};
</script>

<div class="mx-auto max-w-xs">
	{#if loading}
		<LoadingSpinner />
	{:else}
		<FileDrop on:filedrop={handleDrop}>
			<div class="p-5 rounded-xl border-2 border-dashed shadow-md border-primary bg-base-500">
				<div class="flex flex-col gap-5 items-center">
					<img src="https://www.svgrepo.com/show/449957/upload.svg" class="w-10" alt="" />
					<span class="font-light text-gray-400">{label}</span>
				</div>
			</div>
		</FileDrop>
	{/if}
</div>
