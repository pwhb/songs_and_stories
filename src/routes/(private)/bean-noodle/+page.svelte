<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import { page } from '$app/stores';
	import Input from '$lib/components/common/input.svelte';
	import EditUser from '$lib/components/pages/editUser.svelte';
	const { fullUser } = $page.data;
	let { firstName, lastName, username, penName, avatar } = fullUser;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const url = `/api/users`;
		const options = {
			method: 'PATCH',
			body: JSON.stringify({ firstName, lastName, username, penName, avatar })
		};

		const res = await fetch(url, options);
		const data = await res.json();
		if (data.success) {
			toast.push('Successfully Updated!', {
				theme: {
					'--toastColor': 'mintcream',
					'--toastBackground': 'rgba(72,187,120,0.9)',
					'--toastBarBackground': '#2F855A'
				}
			});
			await invalidateAll();
		}
	};
</script>

<EditUser doc={fullUser} showRole={false} />
