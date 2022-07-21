<script>
	import SolverBase from "../solverBase.svelte"
	
	import { vigenereDecode } from "../../lib/shiftCiphers.js"
	import { danishAlphabet } from "../../lib/shared.js"

	let key = ""
	let cipherText = ""
	let alphabet = danishAlphabet
	let encrypt = false

	$: solution = key ? vigenereDecode(cipherText, key, alphabet, encrypt) : ""

	$: {
		let keyArray = []
		for (let char of key) { if (alphabet.toLowerCase().includes(char.toLowerCase())) keyArray.push(char) }
		key = keyArray.join("")
	}

	function changeEncryptDecrypt(e) {
		cipherText = solution
		encrypt = e.target.checked
	}

</script>

<SolverBase {cipherText} clearText={solution}>
	<form id="inputForm" slot="input">
		<label for="alphabet">The alphabet used for { encrypt ? "encryption" : "decryption"}.</label>
		<input type="text" name="alphabet" placeholder="abc..." bind:value="{alphabet}">

		<label for="alphabet">The key used for { encrypt ? "encryption" : "decryption"}.</label>
		<input type="text" name="alphabet" placeholder="Insert key here" bind:value="{key}">

		<label for="cipherText">The cipher text to decode.</label>
		<textarea placeholder="Insert cipher text here" id="cipherText" name="cipherText" bind:value={cipherText}></textarea>

		<input id="decode" class="switch" type="checkbox" on:change={changeEncryptDecrypt}>
		<label class="switch" for="decode">{ encrypt ? "Encrypt using vigenere" : "Decrypt using vigenere"}</label>
	</form>

	<h1 slot="solution">{solution}</h1>
</SolverBase>

<style lang="scss">
</style>
