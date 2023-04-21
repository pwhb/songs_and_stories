<script>
	import { page } from '$app/stores';
	import Footer from '$lib/components/layout/footer.svelte';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import '../app.css';

	console.log('layout', $page.data);
</script>

<main data-theme="cupcake">
	<Navbar />
	<div class="mi min-h-[75vh]">
		<slot />
		<div class="max-w-6xl mx-auto my-20">
			<p>{JSON.stringify($page.data)}</p>
		</div>
	</div>

	<Footer />
</main>
