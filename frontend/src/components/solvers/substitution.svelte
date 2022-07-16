<script>
	import SolverBase from "../solverBase.svelte"
	
	import { writable } from "svelte/store"
	import { substitute as substitutionDecode } from "../../lib/handleCipherText.js"

	let cipherText = ""
	let alphabet = "abcdefghifjklmnopqrstuvwxyzæøå"
	let substitutionTable = {}

	$: solutions = substitutionDecode(cipherText, substitutionTable)

	function clearSubTable() {
		const newTable = {}

		for (let char of alphabet) {
			newTable[char] = ""
		}

		substitutionTable = newTable
	}

</script> 

<SolverBase title="Mono-alphabetic substitution-cipher solver">
	<form id="inputForm" slot="input">
		<label for="alphabet">The alphabet with substitutions.</label>
		<br>
		<input type="text" name="alphabet" placeholder="abc..." bind:value="{alphabet}">
		<br>
		<label for="alphabet">The cipher text to decode.</label>
		<br>
		<textarea placeholder="Insert cipher text here" id="textbox" name="cipherText" bind:value={cipherText}></textarea>
		<br>
		<br>
		<h1>Substitution Table</h1>
		<input type="button" value="Clear" on:click="{clearSubTable}">

		<div id="subTable">
			{#each alphabet.split("") as letter}
				<label for="letter-{letter}">
					{letter}<input type="text" id="letter-{letter}" bind:value="{substitutionTable[letter]}">
				</label>
			{/each}
		</div>
	</form>
	
	<svelte:fragment slot="solution">
		<h1>
			{#each solutions as {modified, char, ID} (ID) }
				<span class:modified>{char}</span>
			{/each}
		</h1>
	</svelte:fragment>
</SolverBase>

<style lang="scss">
#subTable {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
}

span {
	color: red;

	&.modified {
		color: green;
	}
}
</style>
