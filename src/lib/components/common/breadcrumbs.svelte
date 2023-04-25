<script lang="ts">
	import { page } from '$app/stores';

	import { getBreadcrumbs } from '$lib/utils/formatters';
</script>

<div class="px-10 pt-3">
	<div class="text-2xl font-medium text-primary-content capitalize breadcrumbs mt-2">
		<ul>
			{#each getBreadcrumbs($page.url.pathname) as breadcrumb}
				<li><a href={breadcrumb.href}>{breadcrumb.label}</a></li>
			{/each}
		</ul>
	</div>
</div>
