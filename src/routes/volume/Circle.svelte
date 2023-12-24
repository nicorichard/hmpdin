<script>
    export let radius = 50;
    export let text = null;

    let scalar = 10;

    $: scale = radius * 2 * scalar;
    $: width = `${scale}px`;
    $: height = `${scale}px`;
</script>

<div id="circle" style:width style:height>
    <div id="centered">
        {text ? text : ""}
    </div>
</div>

<style>
    #circle {
        display: inline-block;
        background-color: lightblue;
        border-radius: 50%;
        opacity: 0.5;
        margin: 2px;
    }
    #centered {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        font: 0.1em sans-serif;
    }
</style>