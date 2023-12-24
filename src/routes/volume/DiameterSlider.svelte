<script>
    import { calculateVolume  } from "./volume";
    import Pizza from "./Pizza.svelte";

    let diameter = 10;
    $: radius = diameter / 2;
    $: volume = Number(calculateVolume(radius)).toFixed(1);
</script>

<label>
    {diameter}in diameter
    <input type="range" bind:value={diameter} min="1" max="30">
    {volume}in&#179; volume
    <div>
        <Pizza {radius} />
    </div>
</label>