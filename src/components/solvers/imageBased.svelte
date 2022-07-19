<script>
	import SolverBase from "../solverBase.svelte"

	import { translateOptions, translateTable } from "../../lib/imageBased.js"

	let cipherText = ""
	let imageKind = "dk-frimur"

	$: solutionImageNames = cipherText.toLowerCase().split("").map((letter) => {
		if (letter in translateTable[imageKind].translations) {
			return {"found" : true, "content" : translateTable[imageKind].translations[letter]}
		} else {
			return {"found" : false, "content" : letter}
		}
	})

</script> 

<SolverBase {cipherText}>
	<form id="inputForm" slot="input">
		<select name="imageKindChooser" id="imageKindChooser" bind:value={imageKind}>
			{#each Object.keys(translateOptions) as option}
				<option value="{translateOptions[option]}">{option}</option>
			{/each}
		</select>

		<label for="alphabet">The cipher text to encode.</label>
		<textarea placeholder="Insert cipher text here" id="textbox" name="cipherText" bind:value={cipherText}></textarea>

	</form>
	
	<div slot="solution">
		{#each solutionImageNames as image}
			{#if image.found}
				<img src="img/{translateTable[imageKind].path}/{image.content}"/>
			{:else}
				<span>{image.content}</span>
			{/if}
		{/each}
	</div>
</SolverBase>

<style lang="scss">
span {
	height: 3rem;
	display: inline-block;
	font-size: 3rem;
	vertical-align: top;
}

img {
	object-fit: contain;
	min-width: 1.5rem;
	height: 3rem;
	margin-right: 0.4rem;
}
</style>
