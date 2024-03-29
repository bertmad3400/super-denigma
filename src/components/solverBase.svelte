<script>
	export let cipherText = ""
	export let clearText = ""

	let alphabet = "abcdefghijklmnopqrstuvwxyzæøå"

	$: cipherTextSummary = summarizeCharCount(countChars(cipherText, alphabet))
	$: clearTextSummary = summarizeCharCount(countChars(clearText, alphabet))

	import Title from "./generic/collapsibleTitle.svelte"
	import Chart from "./generic/chart.svelte"
	import { countChars, summarizeCharCount } from "../lib/statistics.js"

</script>

	<div class="boxedArea inputArea" >
		<Title title="Input" open="{true}">
			<slot name="input">
			</slot>
		</Title>
	</div>

	<div class="boxedArea" id="solutionArea">
		<Title title="Solution" open="{true}">
			<slot name="solution">
			</slot>
		</Title>
	</div>

	<div class="boxedArea inputArea" id="statisticsArea">
		<Title title="Statistics">
			<label for="alphabet">The alphabet used for counting characthers.</label>
			<input type="text" name="alphabet" placeholder="abc..." bind:value="{alphabet}" on:keydown|stopPropagation>

			<hr>

			<h4>Cipher-text summary</h4>
			<Chart data={cipherTextSummary}/>

			{#if Object.keys(clearTextSummary).length > 0}
				<h4>Clear-text summary</h4>
				<Chart data={clearTextSummary}/>
			{/if}
		</Title>
	</div>

<style lang="scss">
h4 {
	margin: 1.5rem;
}


hr {
	width: 100%;
	margin: 2rem 0;
}

:global(.boxedArea) {
	display:flex;
	flex-direction: column;
	box-sizing: border-box;

	justify-content: center;
	align-items: center;

	border: 2px solid #999999;
	background-color: #ffffff;
	transition: box-shadow 0.15s ease-out;

	width: calc(max(50vw, 60ch));
	margin: 3rem auto 3rem auto;

	padding: 3rem;

	&:hover {
		box-shadow: 0 0 5px 0 #3263cd;
		transition: box-shadow 0.15s ease-in;
	}

}

.inputArea {

	:global(form) {
		width: 100%;
	}

	:global(input), :global(select), :global(textarea) {
		margin-bottom: 20px;
		width: 100%;

		padding: 0.6rem;

		border: 1px solid #ccc;
		border-radius: 3px;

		font-weight: 200;
		font-size: 0.8rem;
		font-family: mono;
	}


	:global(textarea) {
		min-height: 300px;
		height: 4vh;
	}

	:global(label) {
		font-weight: 300;
		font-size: 1.2rem;
		font-family: sans;

		margin-bottom: 1rem;
	}

	$height: 2ex;
	$border-thickness: 2px;
	$margin: calc(#{$height} * (0.15 / 2) + #{$border-thickness});

	:global(input.switch) {
		display: none;

		&:disabled + :global(label) {
			cursor: not-allowed;
			opacity: 0.6;
		}
		&:checked + :global(label):before {
			background: red;
			border-color: red;
		}

		&:checked + :global(label):after {
			left: calc((#{$height} * 2) - #{$margin} + #{$border-thickness} * 2);
			transform: translateX(-100%);
		}
	}

	:global(label.switch) {
		position: relative;
		display: inline-block;

		height: $height;

		line-height: calc(#{$height} + (#{$border-thickness} * 2));
		text-align: center;

		padding-left: calc(#{$height} * 3);

		cursor: pointer;

		&:before {
			content: "";

			display: block;
			position: absolute;
			top: 0;
			left: 0;

			width: calc(#{$height} * 2);
			height: $height;

			border-radius: $height;
			border: $border-thickness solid blue;

			background: hsl(0, 0%, 97%);

			transition: background 0.3s;
		}

		&:after {
			content: "";

			display: block;
			position: absolute;
			top: $margin;
			left: $margin;

			border-radius: calc(3ex * 0.85);

			background: black;

			height: calc(#{$height} * 0.85);
			width: calc(#{$height} * 0.85);
			transition: left 0.3s, transform 0.3s, width 0.2s;

		}

		&:active:after {
			width: calc(#{$height} * 1.2);
		}
	}

	:global(label.radio) {
		display: block;
		cursor: pointer;
		user-select:none;

		text-align: left;
		min-width: max-content;

		padding: 1rem;

		transition: background-color 0.2s ease-in-out;

		&:hover {
			background-color: hsl(0, 0%, 97%);
		}

		&+:global(.radio){
			margin-top: -0.4rem;
		}

		:global(input.radio) {
			display: none;

			&+:global(span.radio) {
				display: inline-block;
				position: relative;
				padding-left: 2.4rem;
				&:before{
					content: '';
					display: block;
					position: absolute;
					top: 4px;
					left: 0px;
					border-radius: 50%;
					margin-right: 5px;
					width: 18px;
					height: 18px;
					border: 1px solid hsl(0, 0%, 80%);
				}
				&:after{
					content: '';
					display: block;
					width: 12px;
					height: 12px;
					background: red;
					position: absolute;
					border-radius: 50%;
					top: 8px;
					left: 4px;
					opacity: 0;
					transform: scale(0,0);
					transition: all .2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
				}

			}
			&:checked+:global(span.radio):after{
				opacity: 1;
				transform: scale(1,1);
			}
		}
	}


}

#solutionArea {
	:global(table) {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	:global(td), :global(th) {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	:global(tr:nth-child(even)) {
		background-color: #dddddd;
	}
}

</style>
