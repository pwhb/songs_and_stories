<script lang="ts">
	async function uploadPhoto(e: any) {
		const file = e.target.files?.[0]!;
		const filename = encodeURIComponent(file.name);
		const fileType = encodeURIComponent(file.type);

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

<h1>File Uploader</h1>

<input type="file" on:change={uploadPhoto} />
