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
				<th>Username</th>
				<th>Pen Name</th>
				<th>Role</th>
				<th> <a class="btn btn-primary btn-xs" href={`/bean-noodle/users/create`}>Create</a></th>
			</tr>
		</thead>
		<tbody>
			{#each docs as { _id, firstName, lastName, username, penName, role }, idx}
				<tr>
					<th>{idx + 1}</th>
					<td>{firstName + ' ' + lastName}</td>
					<td>{username}</td>
					<td>{penName}</td>
					<td><div class="badge badge-primary">{role}</div></td>
					<td>
						<a class="btn btn-primary btn-xs" href={`/bean-noodle/users/${_id}`}>Edit</a>
						<button class="btn btn-secondary btn-xs">Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
