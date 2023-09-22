<script lang="ts">
	import { split } from 'postcss/lib/list';
	import Curve from '../common/curve.svelte';

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
	const birthday = `Happy ${age}${nthNumber(age)} Birthday`;
	const getDegree = (idx: number, length: number) => {
		let mid;
		if (length % 2 == 0) {
			mid = length / 2;
		}
	};
</script>

<link href="https://fonts.cdnfonts.com/css/birthday-2" rel="stylesheet" />
<div class="grid place-items-center min-h-[75vh] birthday-container">
	<div class="m-5 text-center">
		<div>
			{#each Array.from({ length: age }) as _, idx}
				<img
					src="https://www.svgrepo.com/show/395971/candle.svg"
					class={`inline-block w-8 waviy rotate delay-${idx % 5}`}
					alt="candle"
				/>
			{/each}
		</div>
		<div class="text-6xl waviy">
			<p class="font-black text-pink-600">Happy {age}{nthNumber(age)} Birthday</p>

			<p class="font-black text-teal-600">Nilar Win Htut</p>
		</div>
	</div>
</div>

<style>
	.birthday-container {
		background-image: url('cat_paws.jpg');
		background-size: cover;
	}
	.hbd {
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
