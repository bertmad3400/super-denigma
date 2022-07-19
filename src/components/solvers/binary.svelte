<script>
	import SolverBase from "../solverBase.svelte"
	import { nrReps, textToNumber, numberToText } from "../../lib/handleCipherText.js"

	let delimiter = " "
	let cipherText = ""
	let alphabet = "abcdefghijklmnopqrstuvwxyzæøå"
	let currentNrRep = "Binary"

	let usingAscii = true
	let decode = true

	$: solution = decode ? numberToText(cipherText.split(delimiter), currentNrRep, usingAscii ? false : alphabet).join("") : textToNumber(cipherText, currentNrRep, usingAscii ? false : alphabet).join(delimiter)

	function changeDecodeEncode(e) {
		cipherText = solution
		decode = e.target.checked
	}
</script> 

<SolverBase {cipherText} clearText={solution}>
	<form id="inputForm" slot="input">
		<label for="alphabet">The alphabet to loop through.</label>
		<input type="text" name="alphabet" id="alphabet" placeholder="abc..." bind:value="{alphabet}" disabled={usingAscii}>

		<input id="usingAscii" class="switch" type="checkbox" name="usingAscii" checked={usingAscii} on:change="{(e) => usingAscii = e.target.checked}">
		<label class="switch" for="usingAscii">{usingAscii ? "Convert using ASCII/UTF-8" : "Convert using numbering of alphabet"}</label>

		<hr>

		{#each Object.keys(nrReps) as nrRep}
			<label class="radio">
				<input name="radio" type="radio" class="radio" bind:group={currentNrRep} value={nrRep}>
				<span class="radio">{nrRep}</span>
			</label>
		{/each}


		<hr>

		<label for="shiftCount">A string used as the delimiter</label>
		<input type="text" name="delimiter" id="delimiter" bind:value="{delimiter}">
		<label for="alphabet">The cipher text to decode.</label>
		<textarea placeholder="Insert cipher text here" id="textbox" name="cipherText" bind:value={cipherText}></textarea>

		<input id="decode" class="switch" type="checkbox" on:change={changeDecodeEncode} checked={decode}>
		<label class="switch" for="decode">{ decode ? "Decode from numbers" : "Encode to numbers"}</label>
	</form>
	
	<h1 slot="solution">{solution}</h1>
</SolverBase>

<style lang="scss">
</style>
