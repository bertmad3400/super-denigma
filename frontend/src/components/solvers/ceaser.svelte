<script>
	import SolverBase from "../solverBase.svelte"
	
	import { writable } from "svelte/store"
	import { ceaserHandler as ceaserDecode } from "../../lib/handleCipherText.js"

	let cipherText = ""
	let shiftCount = 3
	let alphabets = ["abcdefghifjklmnopqrstuvwxyzæøå"]
	let wholeAlfabet = false

	async function handleCheckbox(e) {
		wholeAlfabet = e.target.checked
		if (e.target.checked) {
			alphabets = [alphabets[0]]
		}
	}

	$: solution = ceaserDecode(cipherText, shiftCount, alphabets, wholeAlfabet)

</script> 

<SolverBase>
	<form id="inputForm" slot="input">
		<label for="shiftCount">The number of times to shift the cipher text (check box for looping through whole alphabet).</label>
		<br>
		<input type="number" name="shiftCount" bind:value="{shiftCount}">
		<input type="checkbox" name="wholeAlfabetRange" checked={wholeAlfabet} on:change="{handleCheckbox}">
		<br>
		<label for="alphabet">The alphabet to loop through (button for adding more).</label>
		<br>
		{#each alphabets as alphabet, i}
			<input type="text" name="alphabet" placeholder="abc..." bind:value="{alphabets[i]}">
		{/each}
		<input type="button" value="+" on:click="{() => alphabets = [...alphabets, ""]}" disabled="{wholeAlfabet}">
		<br>
		<label for="alphabet">The cipher text to decode.</label>
		<br>
		<textarea placeholder="Insert cipher text here" id="textbox" name="cipherText" bind:value={cipherText}></textarea>
	</form>
	
	<svelte:fragment slot="solution">
		{#if Array.isArray(solution) }
			<table>
				<tr>
					<th>Shift Count</th>
					<th>Solution</th>

				</tr>

				{#each solution as singleSolution}
					<tr>
						<td>{ singleSolution.shiftCount }</td>
						<td>{ singleSolution.clearText }</td>
					</tr>
				{/each}
			</table>
		{:else}
			<h1>{solution}</h1>
		{/if}
	</svelte:fragment>
</SolverBase>

<style lang="scss">
</style>
