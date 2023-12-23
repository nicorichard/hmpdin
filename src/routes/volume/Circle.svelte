<script>
    export let radius = 50;

    let scalar = 10;

    $: scale = radius * 2 * scalar;
    $: width = `${scale}px`;
    $: height = `${scale}px`;
</script>

<div id="circle" style:width style:height></div>

<style>
    #circle {
        background-color: lightblue;
        border-radius: 50%;
        opacity: 0.5;
    }
</style>