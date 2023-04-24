<script lang="ts">
	import FileDrop from 'filedrop-svelte';
	import type { Files } from 'filedrop-svelte';
	import LoadingSpinner from './loadingSpinner.svelte';
	let files: Files;
	export let label = 'Upload files';
	export let loading = false;

	export let handleUpdateUrls = (urls: any) => {};

	let urls: any = [];
	const handleUpload = async (file: any) => {
		loading = true;
		const formData = new FormData();
		formData.append('file', file);
		const url = '/api/upload';
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
				console.log('upload', data);
				urls = [...urls, data.Location];
				console.log(urls);

				handleUpdateUrls(urls);
			}
		}
	};
</script>

<div class="max-w-xs mx-auto">
	{#if loading}
		<LoadingSpinner />
	{:else}
		<FileDrop on:filedrop={handleDrop}>
			<div class="p-5 border-2 border-dashed border-primary shadow-md rounded-xl bg-base-500">
				<div class="flex flex-col items-center gap-5">
					<img src="https://www.svgrepo.com/show/449957/upload.svg" class="w-10" alt="" />
					<span class="font-light text-gray-400">{label}</span>
				</div>
			</div>
		</FileDrop>
	{/if}
</div>

<!-- {#if files}
	<h3>Accepted files</h3>
	<ul>
		{#each files.accepted as file}
			<li>{file.name}</li>
		{/each}
	</ul>
	<h3>Rejected files</h3>
	<ul>
		{#each files.rejected as rejected}
			<li>{rejected.file.name} - {rejected.error.message}</li>
		{/each}
	</ul>
{/if} -->
