<script>
    import { base } from '$app/paths';

    /**
     * @type {number}
     */
    export let radius = 50;
    /**
     * @type {null|string}
     */
     export let text = null;

    let scalar = 10;

    $: scale = radius * 2 * scalar;
    $: width = `${scale}px`;
    $: height = `${scale}px`;
</script>

<div class="pizza-container" style:width style:height>
    <div class="pizza-glow"></div>
    <img src="{base}/pizza.png" alt="A delicious pizza" class="pizza-img" style:width style:height/>
    <div class="centered">
        {#if text}
            <span class="text">{text}</span>
        {/if}
    </div>
</div>

<style>
    .pizza-container {
        display: inline-block;
        margin: 5px;
        position: relative;
        transition: all 0.3s ease;
    }

    .pizza-container:hover {
        transform: rotate(5deg) scale(1.05);
    }

    .pizza-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 90%;
        background: radial-gradient(circle, rgba(255, 200, 100, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }

    .pizza-img {
        border-radius: 50%;
        box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.2),
            0 2px 5px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .pizza-container:hover .pizza-img {
        box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.3),
            0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .text {
        display: inline-block;
        font-family: 'Chewy', cursive;
        font-size: 0.9em;
        padding: 4px 10px;
        background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%);
        color: #fff;
        border-radius: 20px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        border: 2px solid rgba(255,255,255,0.3);
    }
</style>
