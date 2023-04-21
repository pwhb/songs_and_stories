<script>
	import { page } from '$app/stores';
	const { pathname } = $page.url;
	const split = pathname.split('/').slice(1);
	const breadcrumbs = split.map((val, idx) => {
		return {
			label: idx === 0 ? 'edit' : val,
			href: '/' + split.slice(0, idx + 1).join('/')
		};
	});
</script>

<div class="px-10">
	<div class="text-3xl font-medium text-primary capitalize breadcrumbs mb-10">
		<ul>
			{#each breadcrumbs as breadcrumb}
				<li><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
			{/each}
		</ul>
	</div>
</div>
