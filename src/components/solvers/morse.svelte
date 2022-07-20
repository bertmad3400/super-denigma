<script>
	import SolverBase from "../solverBase.svelte"
	
	import { handleMorse } from "../../lib/handleCipherText.js"
	import { morseToLetter, letterToMorse} from "../../lib/shared.js"

	let dotType = "."
	let dashType = "-"
	let delimiter = "/"
	let notRecognized = "?"

	let decode = false

	let cipherText = ""
	$: solution = decode ? handleMorse(cipherText.replaceAll(dotType, ".").replaceAll(dashType, "-"), morseToLetter, delimiter, "", notRecognized) : handleMorse(cipherText, letterToMorse, "", delimiter).replaceAll(".", dotType).replaceAll("-", dashType)

	function changeDecodeEncode(e) {
		cipherText = solution.replaceAll("?", "")
		decode = e.target.checked
	}

</script> 

<SolverBase {cipherText} clearText={solution}>
	<form id="inputForm" slot="input">
		<label for="shiftCount">A string used as the value of a dot</label>
		<input type="text" name="dotType" id="dotType" bind:value="{dotType}">
		<label for="shiftCount">A string used as the value of a dash</label>
		<input type="text" name="dashType" id="dashType" bind:value="{dashType}">
		<label for="shiftCount">A string used as the delimiter</label>
		<input type="text" name="delimiter" id="delimiter" bind:value="{delimiter}">
		<label for="shiftCount">A string used when the morse isn't recognized</label>
		<input type="text" name="notRecognized" id="notRecognized" bind:value="{notRecognized}">
		<label for="cipherText">The cipher text to decode.</label>
		<textarea placeholder="Insert cipher text here" id="cipherText" name="cipherText" bind:value={cipherText}></textarea>
		<input id="decode" class="switch" type="checkbox" on:change={changeDecodeEncode}>
		<label class="switch" for="decode">{ decode ? "Decode morse" : "Encode to morse"}</label>
	</form>
	
	<h1 slot="solution">{solution}</h1>
</SolverBase>

<style lang="scss">
</style>
