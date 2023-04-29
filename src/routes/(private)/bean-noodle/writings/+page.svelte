<script lang="ts">
	import { page } from '$app/stores';
	import TableWrapper from '$lib/components/common/tableWrapper.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { parseDate } from '$lib/utils/formatters';
	const { docs } = $page.data;
	let search = '';
	let filteredResults: any = docs;

	$: {
		filteredResults = filterResults(search, docs, ['name']);
	}
</script>

<TableWrapper bind:search>
	<!-- head -->
	<thead>
		<tr>
			<th />
			<th>Title</th>
			<th>Finish Date</th>
			<th>Updated At</th>
			<th>Active</th>
			<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/writings/create`}>Create</a></th>
		</tr>
	</thead>
	<tbody>
		{#each filteredResults as { _id, title, slug, updatedAt, finishedAt, active }, idx}
			<tr>
				<th>{idx + 1}</th>
				<td>
					<a href={`/stories/${slug}`}>
						{title}
					</a>
				</td>
				<td>{parseDate(finishedAt)}</td>
				<td>{parseDate(updatedAt)}</td>
				<td>
					{#if active}
						<span class="badge badge-primary">active</span>
					{:else}
						<span class="badge badge-secondary">inactive</span>
					{/if}
				</td>
				<td>
					<a class="btn btn-primary btn-xs" href={`/bean-noodle/writings/${_id}`}>Edit</a>
					<button class="btn btn-secondary btn-xs">Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</TableWrapper>
