<script lang="ts">
	import { page } from '$app/stores';
	import TableWrapper from '$lib/components/common/tableWrapper.svelte';
	import { filterResults } from '$lib/utils/filter';
	import { parseDate } from '$lib/utils/formatters';

	const { docs } = $page.data;
	let search = '';
	let filteredResults: any = docs;

	$: {
		filteredResults = filterResults(search, docs, ['username', 'penName', 'firstName', 'lastName']);
	}
</script>

<TableWrapper bind:search>
	<!-- head -->
	<thead>
		<tr>
			<th />
			<th>Name</th>
			<th>Username</th>
			<th>Pen Name</th>
			<th>Role</th>
			<th>Created At</th>
			<th>Updated At</th>
			<th>Active</th>
			<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/users/create`}>Create</a></th>
		</tr>
	</thead>
	<tbody>
		{#each filteredResults as { _id, firstName, lastName, username, penName, role, createdAt, updatedAt, active }, idx}
			<tr>
				<th>{idx + 1}</th>
				<td>{firstName + ' ' + lastName}</td>
				<td>{username}</td>
				<td>{penName}</td>
				<td><div class="badge badge-primary">{role}</div></td>
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
					<a class="btn btn-primary btn-xs" href={`/bean-noodle/users/${_id}`}>Edit</a>
					<button class="btn btn-secondary btn-xs">Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</TableWrapper>
