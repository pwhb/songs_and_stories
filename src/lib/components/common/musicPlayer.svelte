<script>
	export let title = '';
	export let artist = '';
	export let thumbnail =
		'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2019/07/fly_me_to_the_moon_poster/19490935-1-eng-GB/Fly_me_to_the_Moon_poster_pillars.jpg';
	export let src = '';

	const audio = new Audio(src);

	const playIcon = 'https://www.svgrepo.com/show/499775/play.svg';
	const pauseIcon = 'https://www.svgrepo.com/show/499769/pause.svg';

	let isPlaying = false;

	const toggleMusic = () => {
		isPlaying = !isPlaying;
		// if (isPlaying) {
		// 	audio.play();
		// } else {
		// 	audio.pause();
		// }
	};
</script>

<div class="card card-side max-w-md mx-auto bg-base-100 shadow-xl p-5">
	<div class="card w-full flex flex-row gap-6 mx-2">
		<div class="flex">
			<img class="bg-base-300 h-24 w-24 object-contain mask mask-squircle" src={thumbnail} alt="" />
		</div>
		<div class="flex flex-col flex-1 my-4">
			<p class={isPlaying ? 'font-bold text-xs border rounded-xl text-primary truncate' : 'font-bold text-xs'}>
				{title}
			</p>
			<p class="text-xs font-thin">{artist}</p>
		</div>
		<div class="flex">
			<button on:click={toggleMusic}>
				<img class="w-12" src={isPlaying ? pauseIcon : playIcon} alt="" />
			</button>
		</div>
	</div>
</div>
