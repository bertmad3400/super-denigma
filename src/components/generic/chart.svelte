<script>
	import { Chart, LinearScale, BarController, BarElement, CategoryScale} from 'chart.js';
	Chart.register(LinearScale, BarController, BarElement, CategoryScale )

	import {onMount, afterUpdate, onDestroy} from "svelte"

	export let data
	
	let ctx
	let currentChart
	let chartName = ""

	afterUpdate(() => {

		if (currentChart) currentChart.destroy()

		currentChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Object.keys(data),
				datasets: [{
					label: '% of all characthers',
					data: Object.values(data),
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						ticks : {
							callback: function(value, index, ticks) {
								return value + "%"
							}
						}
					}
				}
			}
		});

	})

	onDestroy(() => {
		if (currentChart) currentChart.destroy()
	})
</script>

<canvas bind:this={ctx} width="100" height="50"></canvas>
