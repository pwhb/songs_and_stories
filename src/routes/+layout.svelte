<script>
	import { page } from '$app/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Footer from '$lib/components/layout/footer.svelte';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import '../app.css';
	import 'bytemd/dist/index.css';
	import NavProgress from '$lib/components/common/navProgress.svelte';

	const options = { classes: ['log'] };
</script>

<main data-theme="cupcake">
	<Navbar />
	<div class="mi min-h-[75vh]">
		<slot />
		{#if $page.data.privateConfig.debug}
			<div class="mx-auto my-20 max-w-6xl">
				<p>{JSON.stringify($page.data)}</p>
			</div>
		{/if}
	</div>

	<Footer />
	<SvelteToast {options} />
	<NavProgress />
</main>

<style>
	:global(.log.info) {
		--toastBackground: green;
	}
	:global(.log.warn) {
		--toastBackground: red;
	}
</style>
