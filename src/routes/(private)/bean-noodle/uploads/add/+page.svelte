<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import Dropzone from '$lib/components/common/dropzone.svelte';
	import UrlCopyButton from '$lib/components/common/urlCopyButton.svelte';
	import { getContentType, getFileSize, getUrl } from '$lib/utils/formatters';
	let url = '';
	let ContentType = '';
	let size = 0;
	const callback = async (data: any) => {
		console.log(data);

		if (data.insertedId) {
			url = getUrl(data.insertedId);
			ContentType = data.ContentType;
			size = data.Size;
		}
	};
</script>

{#if url}
	<div class="mx-auto mb-10 max-w-md text-center">
		{#if getContentType(ContentType) === 'image'}
			<img src={url} alt="" />
			<p>{getFileSize(size)}</p>
		{:else if getContentType(ContentType) === 'audio'}
			<audio controls>
				<source src={url} type={ContentType} />
			</audio>
		{:else if getContentType(ContentType) === 'video'}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video controls>
				<source src={url} type={ContentType} />
			</video>
		{/if}
		<a href={url} target="_blank">{url}</a>
		<UrlCopyButton {url} />
	</div>
{/if}
<Dropzone label="upload file" {callback} />
