<script lang="ts">
	import { page } from '$app/stores';

	const { config } = $page.data;
</script>

<div class="hero min-h-screen" style={`background-image: url(${config.hero.img});`}>
	<div class="hero-overlay bg-opacity-40" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">{config.hero.title}</h1>
			<p class="mb-5 text-xl">
				{config.hero.txt}
			</p>
			<a href="/stories" class="btn btn-primary">{config.hero.btn}</a>
		</div>
	</div>
</div>
