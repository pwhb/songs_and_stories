<script>
	import { page } from '$app/stores';
	import { getBreadcrumbs } from '$lib/utils/formatters';
</script>

<div class="px-10">
	<div class="text-2xl font-medium text-primary capitalize breadcrumbs mb-5">
		<ul>
			{#each getBreadcrumbs($page.url.pathname) as breadcrumb}
				<li><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
			{/each}
		</ul>
	</div>
</div>
