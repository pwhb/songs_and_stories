<script lang="ts">
	let username: string;
	let password: string;
	async function handleSubmit() {
		console.log({ username, password });
	}
</script>

<div class="max-w-sm mx-auto mt-8">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-6">
			<label class="text-sm font-bold mb-2" for="username"> Username </label>
			<input
				class="input input-bordered w-full"
				type="username"
				name="username"
				id="username"
				bind:value={username}
				required
			/>
		</div>
		<div class="mb-6">
			<label class="text-sm font-bold mb-2" for="password"> Password </label>
			<input
				class="input input-bordered w-full"
				type="password"
				name="password"
				id="password"
				bind:value={password}
				required
			/>
		</div>
		<div class="text-center">
			<button class="btn btn-primary" type="submit"> Login </button>
		</div>
	</form>
</div>
