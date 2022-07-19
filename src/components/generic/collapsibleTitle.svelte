<script>
	export let title
	export let open = false

	import { slide } from 'svelte/transition';
</script>

<h1 on:click={() => open = !open}>{ title }<button><svg fill="currentColor" class:open focusable="false" height="20" width="20" viewBox="0 0 20 20"><path d="M6.432 3.218a.5.5 0 0 1 .638-.058l.07.058 6.428 6.428a.5.5 0 0 1 .058.638l-.058.07-6.429 6.428a.5.5 0 0 1-.765-.638l.058-.069 6.075-6.076-6.075-6.074a.5.5 0 0 1-.058-.638l.058-.07Z" fill="currentColor" fill-rule="nonzero"></path></svg></button></h1>

{#if open}
	<div transition:slide>
		<slot></slot>
	</div>
{/if}


<style lang="scss">
h1 {
	font-size: 2rem;
	width: 100%;
	margin: 1.5rem;
	text-align: left;

	display: flex;
	justify-content: space-between;

	cursor: pointer;

	border-bottom: 2px solid hsl(0, 0%, 70%);

		clip-path: polygon(
		calc(0% + 1px) calc(0% + 1px), /* top left */
		calc(100% - 1px) calc(0% + 1px), /* top right */
		calc(100% - 1px) calc(100% - 1px), /* bottom right */
		calc(0% + 1px) calc(100% - 1px) /* bottom left */
	);

	transition: clip-path 0.3s linear, border-color 0.3s;


	&:hover {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		border-color: hsl(0, 0%, 50%);
	}

	button {
		aspect-ratio: 1/1;
		margin: 0;
		padding: 0;

		cursor: pointer;
		transition: background-color 0.2s ease-in-out;

		border: none;
		background-color: transparent;

		flex-shrink: 0;

		&:hover {
			background-color: hsl(0, 0%, 96%);
		}

		svg {
			opacity: 0.45;
			transition: transform 0.4s;

			height: 1.2rem;
			width: 1.2rem;
		}

		svg.open {
			transform: rotate(90deg);
			transition: transform 0.4s;
		}
	}

}

div {
	width: 100%;
}
</style>
