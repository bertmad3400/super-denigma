<script>
	import SolverBase from "../solverBase.svelte"

	import { substitute as substitutionDecode, subLangs, createTableFromTemplate, createRandomTable } from "../../lib/substitution.js"
	import { danishAlphabet } from "../../lib/shared.js"

	let cipherText = ""
	let alphabet = danishAlphabet
	let substitutionTable = {}
	let currentTemplate = ""

	$: solutions = substitutionDecode(substitutionTable, cipherText)

	let clearWord = ""
	let cipherWord = ""

	$: {
		clearSubTable()

		clearWord = clearWord.toLowerCase()
		cipherWord = cipherWord.toLowerCase()

		if (clearWord && cipherWord && clearWord.length === cipherWord.length) {
			for (let i = 0; i < clearWord.length; i++) {
				substitutionTable[cipherWord[i]] = clearWord[i]
			}
		}
	}

	function clearSubTable() {
		const newTable = {}

		for (let char of alphabet) {
			newTable[char] = ""
		}

		substitutionTable = newTable
		currentTemplate = ""
	}

	function randomizeSubTable() {
		substitutionTable = createRandomTable(alphabet)
	}

	function selectTemplate(microShuffle = false) {
		alphabet = subLangs[currentTemplate].alphabet
		substitutionTable = createTableFromTemplate(cipherText, subLangs[currentTemplate], microShuffle)

	}

	let lastKey = {	"lastKey" : "",
					"accessTime" : new Date(),

					get key() {
						if (!Boolean(this.lastKey) || new Date() - this.accessTime > 2000) {
							this.lastKey = ""
							return ""
						} else {
							return this.lastKey
						}
					},

					set key(key) {
						this.accessTime = new Date()
						this.lastKey = key
					}
	}

	function handleKeypress(e) {
		let key = e.key.toLowerCase()

		if (key === " " && lastKey.key === " ") {
			clearSubTable()
			lastKey.key = ""
		} else if (alphabet.includes(key) || key === " ") {
			if (Boolean(lastKey.key) && alphabet.includes(lastKey.key)) {
				if (key === " ") {
					substitutionTable[lastKey.key] = ""
				} else {
					substitutionTable[lastKey.key] = key
				}

				lastKey.key = ""
			} else {
				lastKey.key = key
			}
		} else {
			lastKey.key = ""
		}
	}

</script>

<svelte:window on:keydown={handleKeypress}/>

<SolverBase {cipherText} clearText={solutions.map(solution => solution.clearChar).join("")}>
	<form id="inputForm" slot="input">
		<label for="alphabet">The alphabet with substitutions.</label>
		<input type="text" name="alphabet" placeholder="abc..." bind:value="{alphabet}" on:keydown|stopPropagation>
		<label for="alphabet">The cipher text to decode.</label>
		<textarea placeholder="Insert cipher text here" id="textbox" name="cipherText" bind:value={cipherText} on:keydown|stopPropagation></textarea>

		<h1>Substitution Table</h1>

		<div id="subTable">
			{#each alphabet.split("") as letter}
				<label for="letter-{letter}">
					{letter}: <input type="text" id="letter-{letter}" bind:value="{substitutionTable[letter]}" on:keydown|stopPropagation>
				</label>
			{/each}
		</div>

		<div class="multipleInputs">
			<label for="cipherWord">Part of ciphertext.
				<input type="text" name="cipherWord" id="cipherWord" placeholder="Ciper-word" bind:value="{cipherWord}" on:keydown|stopPropagation>
			</label>

			<label for="clearWord">Corresponding cleartext.
				<input type="text" name="clearWord" id="clearWord" placeholder="Clear-word" bind:value="{clearWord}" on:keydown|stopPropagation>
			</label>
		</div>

		<div class="multipleInputs">
			<input type="button" value="Clear" on:click="{clearSubTable}">
			<input type="button" value="Shuffle" on:click="{randomizeSubTable}">
		</div>

		<div class="multipleInputs">
			<input type="button" value="Reset To Template" on:click="{() => selectTemplate()}" disabled={!currentTemplate}>
			<input type="button" value="Micro Shuffle" on:click="{() => selectTemplate(true)}" disabled={!currentTemplate}>
		</div>

		<select name="templates" id="templates" bind:value={currentTemplate} on:change={() => selectTemplate()}>
			<option value="" selected>Apply template</option>
			{#each Object.keys(subLangs) as subLang}
				<option value="{subLang}">{subLang} Template</option>
			{/each}
		</select>
	</form>

	<svelte:fragment slot="solution">
		<h1>
			{#each solutions as {modified, clearChar, oldChar, ID} (ID) }
				<span title="{oldChar}" class:modified>{clearChar}</span>
			{/each}
		</h1>
	</svelte:fragment>
</SolverBase>

<style lang="scss">
#subTable {
	display: grid;
	grid-template-columns: repeat(5, 1fr);

	:global(label) {
		display: flex;
		justify-content: space-evenly;

		:global(input) {
			width: 60%;
		}
	}
}

div.multipleInputs {
	width: 100%;
	display: flex;
	gap: 2rem;

	 * {
		flex-grow: 1;
		flex-basis: 0;
	}

	 label {
		text-align: center;

		input {
			margin-top: 1rem;
		}
	 }
}

span {
	color: red;

	&.modified {
		color: green;
	}
}
</style>
