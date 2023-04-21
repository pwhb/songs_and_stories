<script>
	import { page } from '$app/stores';
	import { capitalize } from '$lib/utils/formatters';

	const { pathname } = $page.url;

	const split = pathname.split('/').slice(1);
	const breadcrumbs = split.map((val, idx) => {
		return {
			label: idx === 0 ? 'Edit' : capitalize(val),
			href: '/' + split.slice(0, idx + 1).join('/')
		};
	});
</script>

<div class="px-10">
	<div class="text-3xl font-medium text-primary breadcrumbs mb-10">
		<ul>
			{#each breadcrumbs as breadcrumb}
				<li><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
			{/each}
		</ul>
	</div>
	<slot />
</div>
