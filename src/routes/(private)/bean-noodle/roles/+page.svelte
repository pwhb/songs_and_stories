<script lang="ts">
	import { page } from '$app/stores';
	import TableWrapper from '$lib/components/common/tableWrapper.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { parseAccessDetails, parseDate } from '$lib/utils/formatters';
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
			<th>Name</th>
			<th>Access</th>
			<th>Created At</th>
			<th>Updated At</th>
			<th>Active</th>
			<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/roles/create`}>Create</a></th>
		</tr>
	</thead>
	<tbody>
		{#each filteredResults as { _id, name, details, createdAt, updatedAt, active }, idx}
			<tr>
				<th>{idx + 1}</th>
				<td>{name}</td>
				<td>
					{parseAccessDetails(details)}
				</td>
				<td>{parseDate(createdAt)}</td>
				<td>{parseDate(updatedAt)}</td>
				<td>
					{#if active}
						<span class="badge badge-primary">active</span>
					{:else}
						<span class="badge badge-secondary">inactive</span>
					{/if}
				</td>
				<td>
					<a class="btn btn-primary btn-xs" href={`/bean-noodle/roles/${_id}`}>Edit</a>
					<button class="btn btn-secondary btn-xs">Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</TableWrapper>
