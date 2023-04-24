<script lang="ts">
	import { page } from '$app/stores';
	import { parseAccessDetails, parseDate } from '$lib/utils/formatters';

	const { docs } = $page.data;
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
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
			{#each docs as { _id, name, details, createdAt, updatedAt, active }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{name}</td>
					<td
						><p>
							{parseAccessDetails(details)}
						</p>
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
	</table>
</div>
