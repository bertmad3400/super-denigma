<script>
</script>

	<div class="boxedArea" id="inputArea">
		<slot name="input">
		</slot>
	</div>

	<div class="boxedArea" id="solutionArea">
		<slot name="solution">
		</slot>
	</div>

<style lang="scss">
:global(.boxedArea) {
	display:flex;
	box-sizing: border-box;

	justify-content: center;
	align-items: center;

	border: 2px solid #999999;
	background-color: #ffffff;
	transition: box-shadow 0.15s ease-out;

	width: calc(max(50vw, 60ch));
	margin: 20px auto;
	padding: 20px;

	&:hover {
		box-shadow: 0 0 5px 0 #3263cd;
		transition: box-shadow 0.15s ease-in;
	}

}

#inputArea {
	padding: 3rem;

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
