<script lang="ts">
	export let pos: { x: number; y: number };
</script>

<div
	style={`left: calc(${(pos.x / 200) * 186}% + 2px); top: calc(${(pos.y / 200) * 186}% + 2px);`}
/>

<style>
	div {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: white;
		border-radius: 5px;

		pointer-events: none;
		z-index: 1;
	}
</style>
