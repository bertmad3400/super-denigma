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

<SolverBase>
	<form id="inputForm" slot="input">
		<label for="alphabet">The alphabet with substitutions.</label>
		<input type="text" name="alphabet" placeholder="abc..." bind:value="{alphabet}">
		<label for="alphabet">The cipher text to decode.</label>
		<textarea placeholder="Insert cipher text here" id="textbox" name="cipherText" bind:value={cipherText}></textarea>
		
		<h1>Substitution Table</h1>

		<div id="subTable">
			{#each alphabet.split("") as letter}
				<label for="letter-{letter}">
					{letter}<input type="text" id="letter-{letter}" bind:value="{substitutionTable[letter]}">
				</label>
			{/each}
		</div>

		<input type="button" value="Clear" on:click="{clearSubTable}">
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
