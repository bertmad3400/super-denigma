<script>

	export let title
</script>

	<div class="boxedArea">
		<h1 class="page-title">{ title }</h1>
	</div>

	<div class="boxedArea" id="inputArea">
		<slot name="input">
		</slot>
	</div>

	<div class="boxedArea" id="solutionArea">
		<slot name="solution">
		</slot>
	</div>

<style lang="scss">
h1.page-title {
	font-family: sans-serif;
	font-weight: 100;
}

.boxedArea {
	display:flex;

	justify-content: center;
	align-items: center;

	border: 2px solid #999999;
	background-color: #ffffff;
	transition: box-shadow 0.15s ease-out;

	width: 50vw;
	margin: 20px auto;
	padding: 20px;
}

.boxedArea:hover {
	box-shadow: 0 0 5px 0 #3263cd;
	transition: box-shadow 0.15s ease-in;
}

#inputArea {
	:global(form) {
		width: 100%;
	}

	:global(input), :global(select), :global(textarea) {
		margin-bottom: 20px;
		height: 30px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	:global(input[type=button]), :global(input[type=checkbox]) {
		margin-top: 1vh;
		width: 4vh;
	}

	:global(input[type=number]), :global(input[type=text]), :global(textarea) {
		width: calc(100% - 70px);
		padding: 5px;
	}

	:global(textarea) {
		min-height: 300px;
		height: 4vh;
		width: 97%;

	}

	:global(input[type=submit]) {
		width: 8vh;
		height: 4vh;
	}

	:global(label) {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 14px;
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
		font-weight: 100;
		font-size: 0.8125rem;
		font-family: sans;

		position: relative;
		display: inline-block;

		height: $height;

		line-height: calc(#{$height} + (#{$border-thickness} * 2));
		text-align: center;

		padding-left: calc(#{$height} * 2.5);

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
