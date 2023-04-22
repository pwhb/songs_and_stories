<script lang="ts">
	import { page } from '$app/stores';

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

				<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/roles/create`}>Create</a></th>
			</tr>
		</thead>
		<tbody>
			{#each docs as { _id, name, details }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{name}</td>
					<td
						>{#each Object.keys(details) as access}
							{access}
						{/each}</td
					>

					<td>
						<a class="btn btn-primary btn-xs" href={`/bean-noodle/roles/${_id}`}>Edit</a>
						<button class="btn btn-secondary btn-xs">Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
