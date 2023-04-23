<script lang="ts">
	import { page } from '$app/stores';
	import { parseDate } from '$lib/utils/formatters';
	import { space } from 'postcss/lib/list';

	const { docs } = $page.data;
</script>

<div class="overflow-x-auto">
	<table class="table w-full">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Title</th>
				<th>Artist</th>
				<th>Created At</th>
				<th>Updated At</th>
				<th>Active</th>
				<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/songs/create`}>Create</a></th>
			</tr>
		</thead>
		<tbody>
			{#each docs as { _id, title, artist, createdAt, updatedAt, active }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{title}</td>
					<td>{artist}</td>
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
						<a class="btn btn-primary btn-xs" href={`/bean-noodle/songs/${_id}`}>Edit</a>
						<button class="btn btn-secondary btn-xs">Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
