<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import TableWrapper from '$lib/components/common/tableWrapper.svelte';
	import UrlCopyButton from '$lib/components/common/urlCopyButton.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { getContentType, getFileSize, parseDate } from '$lib/utils/formatters';
	const { docs } = $page.data;
	let search = '';
	let filteredResults: any = docs;

	$: {
		filteredResults = filterResults(search, docs, ['Key']);
	}
</script>

<TableWrapper bind:search>
	<!-- head -->
	<thead>
		<tr>
			<th />
			<th>Key</th>
			<th>Preview</th>
			<th>File Type</th>
			<th>Size</th>
			<th>Created At</th>
			<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/uploads/add`}>add</a></th>
		</tr>
	</thead>
	<tbody>
		{#each filteredResults as { _id, Key, ContentType, Size, createdAt }, idx}
			<tr>
				<th>{idx + 1}</th>
				<td>
					<a href={`${PUBLIC_BASE_URL}/api/uploads/${_id}`} target="_blank">
						{Key.slice(0, 16) + '...'}
					</a>
				</td>
				<td>
					{#if getContentType(ContentType) === 'image'}
						<img src={`${PUBLIC_BASE_URL}/api/uploads/${_id}`} alt={Key} />
					{/if}
					{#if getContentType(ContentType) === 'audio'}
						<audio controls>
							<source src={`${PUBLIC_BASE_URL}/api/uploads/${_id}`} type={ContentType} />
						</audio>
					{/if}
					{#if getContentType(ContentType) === 'video'}
						<!-- svelte-ignore a11y-media-has-caption -->
						<video controls>
							<source src={`${PUBLIC_BASE_URL}/api/uploads/${_id}`} type={ContentType} />
						</video>
					{/if}
				</td>

				<td>
					<div class="badge badge-primary">
						{getContentType(ContentType)}
					</div>
				</td>
				<td>{getFileSize(Size)}</td>
				<td>{parseDate(createdAt)}</td>
				<td>
					<UrlCopyButton url={`${PUBLIC_BASE_URL}/api/uploads/${_id}`} />
				</td>
			</tr>
		{/each}
	</tbody>
</TableWrapper>
