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

<div id="circle" style:width style:height>
    <img src="{base}/pizza.png" alt="A pizza" style:width style:height/>
    <div id="centered">
        {#if text}
            <span class="text">{text}</span>
        {/if}
    </div>
</div>

<style>
    #circle {
        display: inline-block;
        margin: 2px;
        position: relative;
    }
    #centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .text {
        display: inline-block;
        font: 0.3em sans-serif;
        padding: 2px;
        margin-bottom: 4px;
        background-color: #000;
        color: white;
    }
</style>