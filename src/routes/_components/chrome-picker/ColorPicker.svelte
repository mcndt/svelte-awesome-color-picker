<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker/ColorPicker.svelte';
	import Input from './Input.svelte';
	import SliderIndicator from './SliderIndicator.svelte';
	import SliderWrapper from './SliderWrapper.svelte';
	import PickerIndicator from './PickerIndicator.svelte';
	import PickerWrapper from './PickerWrapper.svelte';
	import Wrapper from './Wrapper.svelte';
	import HexInput from "./HexInput.svelte";
</script>

<ColorPicker
	components={{
		input: Input,
		sliderIndicator: SliderIndicator,
		sliderWrapper: SliderWrapper,
		alphaIndicator: SliderIndicator,
		alphaWrapper: SliderWrapper,
		pickerIndicator: PickerIndicator,
		pickerWrapper: PickerWrapper,
		wrapper: Wrapper
	}}
	toRight
>
	<div slot="x" let:color let:setColor>
		<HexInput {color} onBlur={color => setColor(color)}/>
	</div>
</ColorPicker>
