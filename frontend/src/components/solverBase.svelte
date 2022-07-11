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
