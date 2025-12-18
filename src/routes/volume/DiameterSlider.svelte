<script>
    import { calculateVolume  } from "./volume";
    import Pizza from "./Pizza.svelte";

    let diameter = 10;
    $: radius = diameter / 2;
    $: volume = Number(calculateVolume(radius)).toFixed(1);

    $: sizeLabel = diameter < 8 ? "tiny!" : diameter < 12 ? "personal" : diameter < 16 ? "medium" : diameter < 20 ? "large" : diameter < 25 ? "XL" : "MEGA";
</script>

<div class="slider-container">
    <div class="slider-controls">
        <div class="diameter-display">
            <span class="value">{diameter}"</span>
            <span class="label">diameter</span>
            <span class="size-tag">{sizeLabel}</span>
        </div>

        <input
            type="range"
            bind:value={diameter}
            min="4"
            max="30"
            class="pizza-slider"
        >

        <div class="volume-display">
            <span class="value">{volume}</span>
            <span class="label">in³ volume</span>
        </div>
    </div>

    <div class="pizza-preview">
        <Pizza {radius} />
        <div class="pizza-shadow"></div>
    </div>

    <div class="comparison-hint">
        <span class="hint-icon">↕️</span>
        <span>Drag the slider and watch the pizza grow!</span>
    </div>
</div>

<style>
    .slider-container {
        padding: 20px;
    }

    .slider-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .diameter-display, .volume-display {
        text-align: center;
        min-width: 100px;
    }

    .value {
        display: block;
        font-family: 'Chewy', cursive;
        font-size: 2.5rem;
        color: #d32f2f;
        line-height: 1;
    }

    .label {
        display: block;
        font-size: 0.9rem;
        color: #8d6e63;
        margin-top: 5px;
    }

    .size-tag {
        display: inline-block;
        margin-top: 8px;
        padding: 4px 12px;
        background: linear-gradient(180deg, #ffcc80 0%, #ffb74d 100%);
        border-radius: 20px;
        font-size: 0.85rem;
        color: #5d4037;
        font-weight: bold;
    }

    .pizza-slider {
        flex: 1;
        min-width: 150px;
        height: 25px;
        cursor: grab;
    }

    .pizza-slider:active {
        cursor: grabbing;
    }

    .pizza-preview {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        position: relative;
    }

    .pizza-shadow {
        position: absolute;
        bottom: 10px;
        width: 80%;
        height: 20px;
        background: radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%);
        z-index: -1;
    }

    .comparison-hint {
        text-align: center;
        margin-top: 15px;
        padding: 10px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        color: #8d6e63;
        font-size: 0.95rem;
    }

    .hint-icon {
        margin-right: 8px;
    }

    @media (max-width: 500px) {
        .slider-controls {
            flex-direction: column;
        }

        .pizza-slider {
            width: 100%;
        }
    }
</style>
