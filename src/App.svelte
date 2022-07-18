<script>
	import MorseSolver from "./components/solvers/morse.svelte"
	import SubstitutionSolver from "./components/solvers/substitution.svelte"
	import CeaserSolver from "./components/solvers/ceaser.svelte"
	import BinarySolver from "./components/solvers/binary.svelte"

	const solvers = {
		"Shift Cipher encryption/decryption" : CeaserSolver,
		"Morse decode/encode" : MorseSolver,
		"Mono-alphabetic substitution-cipher" : SubstitutionSolver,
		"Numeric letter representation" : BinarySolver,
	}

	let currentSolver
</script>

<main>
	<div class="boxedArea">
		<select name="solverChooser" id="solverChooser" bind:value={currentSolver}>
		{#each Object.keys(solvers) as solver}
			<option value="{solver}">{solver}</option>
		{/each}
	</div>

	<svelte:component this={solvers[currentSolver]} />

</main>

<style lang="scss">
:global(body) {
	background-color: #f2f2f2;
	padding: 0 4vw 0 4vw;
	min-width: fit-content;
}

main {
	min-width: fit-content;
}

select {
	background: none;
	font-family: sans;
	font-weight: 100;
	font-size: 1.5rem;
	border: none;
	border-bottom: 2px solid hsl(0, 0%, 70%);
	cursor: pointer;

	clip-path: polygon(
		calc(0% + 1px) calc(0% + 1px), /* top left */
		calc(100% - 1px) calc(0% + 1px), /* top right */
		calc(100% - 1px) calc(100% - 1px), /* bottom right */
		calc(0% + 1px) calc(100% - 1px) /* bottom left */
	);

	transition: clip-path 0.3s linear, border-color 0.3s;


	&:hover {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		border-color: hsl(0, 0%, 50%);
	}

	option {
		font-size: 1rem;
		font-weight: 100;
	}
}

</style>
