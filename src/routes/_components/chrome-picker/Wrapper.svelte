<script lang="ts">
	export let wrapper: HTMLElement;
	export let isOpen: boolean;
	export let isPopup: boolean;
</script>

<div bind:this={wrapper} class:isOpen class:isPopup>
	<slot />
</div>

<style>
	div {
		background-color: white;
		margin: 0 10px 15px;
		padding-bottom: 3px;
		border: 1px solid black;
		border-radius: 8px;
		display: none;
	}
	.isOpen {
		display: flex;
		flex-direction: column;
	}
	.isPopup {
		position: absolute;
		z-index: 2;
	}
</style>
