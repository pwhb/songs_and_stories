<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Confetti } from 'svelte-confetti';
	import MusicPlayer from '../common/musicPlayer.svelte';
	// 0 1 2 3
	const age = new Date().getFullYear() - 2000;
	const nthNumber = (n: number) => {
		if (n > 3 && n < 21) return 'th';
		switch (n % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};
	const { config } = $page.data;

	const onClick = () => {};
</script>

<link href="https://fonts.cdnfonts.com/css/birthday-2" rel="stylesheet" />
<div class="grid place-items-center birthday-container">
	<div class="my-10 text-center">
		{#each Array.from({ length: age }) as _, idx}
			<img
				src="https://www.svgrepo.com/show/395971/candle.svg"
				class={`inline-block w-12 waviy rotate delay-${idx % 5}`}
				alt="candle"
			/>
		{/each}
	</div>
	<Confetti infinite cone amount={200} xSpread={0.00001} fallDistance={'300px'} />
	<div class="text-6xl text-center font-birthday">
		<p class="font-black text-pink-600 waviy">Happy {age}{nthNumber(age)} Birthday</p>
		<button
			on:click={onClick}
			class="block p-5 mx-auto bg-teal-50 rounded-lg shadow-lg transition-opacity"
		>
			<img src={config.nwh_bd.image} alt="birthday girl" class="h-96" />
		</button>

		<p class="font-black text-teal-600 waviy">Nilar Win Htut</p>
	</div>
	<div class="mt-20">
		<MusicPlayer
			title={config.nwh_bd.song.title}
			artist={config.nwh_bd.song.artist}
			src={config.nwh_bd.song.src}
			thumbnail={config.nwh_bd.song.thumbnail}
		/>
	</div>
</div>

<style>
	.font-birthday {
		font-family: 'Birthday';
	}
	.waviy {
		position: relative;
		-webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.4));
		/* font-size: 60px; */
		position: relative;
		display: inline-block;
		text-transform: uppercase;
		animation: waviy 1s infinite;
		animation-delay: calc(0.1s * var(--i));
	}
	@keyframes waviy {
		0%,
		40%,
		100% {
			transform: translateY(0);
		}
		20% {
			transform: translateY(-30px);
		}
	}

	.delay-1 {
		animation-delay: 50ms;
	}
	.delay-2 {
		animation-delay: 100ms;
	}
	.delay-3 {
		animation-delay: 150ms;
	}
	.delay-4 {
		animation-delay: 100ms;
	}
	.delay-5 {
		animation-delay: 50ms;
	}
</style>
