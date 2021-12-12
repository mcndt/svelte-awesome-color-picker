<script lang="ts">
    import type {Color, setColorProp} from "../../../lib/type/types";

    export let color: Color;
    export let onBlur: (color: setColorProp) => void;

    const HEX_COLOR_REGEX = /^#?([A-F0-9]{3,4}|[A-F0-9]{6}|[A-F0-9]{8})$/i

    // let colorCopy: Color
    // $: colorCopy = Object.assign({}, color || {}) as Color
    $: console.log('back', color)

    let mode: 'HEX' | 'RGB' | 'HSV' = 'HEX';
</script>

<div class="container">
    {#if mode === 'HEX'}
        <div class="input-container">
            <input value={color.hex} on:input={(e) => {if (HEX_COLOR_REGEX.test(e.target.value)) onBlur({hex: e.target.value})}}/>
        </div>
        <button on:click={() => mode = 'RGB'}>HEX</button>
    {:else if mode === 'RGB'}
        <div class="input-container">
            <input value={color.r} on:input={(e) => onBlur({rgb: { ...color, r: e.target.value}})}/>
            <input value={color.g} on:input={(e) => onBlur({rgb: { ...color, g: e.target.value}})}/>
            <input value={color.b} on:input={(e) => onBlur({rgb: { ...color, b: e.target.value}})}/>
        </div>
        <button on:click={() => mode = 'HSV'}>RGB</button>
    {:else}
        <div class="input-container">
            <input value={color.h} on:input={(e) => onBlur({hsv: { ...color, h: e.target.value}})}/>
            <input value={color.s} on:input={(e) => onBlur({hsv: { ...color, s: e.target.value}})}/>
            <input value={color.v} on:input={(e) => onBlur({hsv: { ...color, v: e.target.value}})}/>
        </div>
        <button on:click={() => mode = 'HEX'}>HSV</button>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 5px 10px;
    }
    .input-container {
        display: flex;
        flex: 1;
        gap: 10px;
    }
    input, button {
        flex: 1;
        border: none;
        background-color: #EEE;
        padding: 0;
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    input {
        width: 5px;
    }

    button {
        cursor: pointer;
        flex: 1;
    }
</style>
