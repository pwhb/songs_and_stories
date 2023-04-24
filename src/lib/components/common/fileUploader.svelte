<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';

	let files: { accepted: any[]; rejected: any[] } = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		// console.log({ acceptedFiles, fileRejections });

		// files.accepted = [...files.accepted, ...acceptedFiles];
		// files.rejected = [...files.rejected, ...fileRejections];

		acceptedFiles.forEach((val: any) => {
			const reader = new FileReader();
			reader.onload = () => {
				files.accepted = [...files.accepted, ...acceptedFiles];
			};
			reader.readAsDataURL(val);
		});
		console.log(files);
	}
	async function uploadPhoto(e: any) {
		const file = e.target.files?.[0]!;

		const url = '/api/upload';
		const formData = new FormData();

		formData.append('file', file);

		const res = await fetch(url, {
			method: 'POST',
			body: formData
		});

		const { data } = await res.json();
		console.log(data.Location);
	}
</script>

<Dropzone on:drop={handleFilesSelect}>
	<div class="bg-red-200 w-full">hello</div>
</Dropzone>
<ol>
	{#each files.accepted as item}
		<img src={item} alt="" />
		<li>{item}</li>
	{/each}
</ol>
