<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Dropzone from '$lib/components/common/dropzone.svelte';

	import TableWrapper from '$lib/components/common/tableWrapper.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { parseDate } from '$lib/utils/formatters';
	const { docs, bucketBaseUrl } = $page.data;
	let search = '';
	let filteredResults: any = docs;
	console.log(docs);

	$: {
		filteredResults = filterResults(search, docs, ['Key']);
	}

	const uploadFile = async (urls: any) => {
		await invalidateAll();
	};
</script>

<Dropzone label="upload file" handleUpdateUrls={uploadFile} />
<TableWrapper bind:search>
	<!-- head -->
	<thead>
		<tr>
			<th />
			<th>Key</th>
			<th>File Type</th>
			<th>Size</th>

			<th>LastModified</th>
		</tr>
	</thead>
	<tbody>
		{#each filteredResults as { Key, Size, LastModified }, idx}
			<tr>
				<th>{idx + 1}</th>
				<td>
					<a href={`${bucketBaseUrl}/${Key}`} target="_blank">
						{Key}
					</a>
				</td>
				<td>
					<div class="badge badge-primary">
						{Key.split('.').splice(-1)}
					</div>
				</td>
				<td>{Size}</td>
				<td>{parseDate(LastModified)}</td>
			</tr>
		{/each}
	</tbody>
</TableWrapper>
