<script>
    import Circle from './Circle.svelte';

    let diameter = 10;
    $: radius = diameter / 2;
    $: volume = Math.PI * Math.pow(radius, 2);
</script>

<h1>Why you should (almost) always buy a bigger pizza</h1>

<p>The volume of a pizza doesn't scale linearly with its size. The volume is proportional to the square of the radius.</p>

<label>
    <input type="range" bind:value={diameter} min="8" max="15">
</label>

<Circle {radius} />
<p>Volume: {volume}</p>


<p>This means that a larger pizza not only gives you more pizza but a <b>disproportionately</b> larger amount.</p>

<p>Furthermore, the relationship between a pizza's volume and the price of the pie are not likely to be perfectly aligned.</p>

<p>It is more than likely that you are paying a premium for smaller pizzas.</p>

<style>
    #circle {
        background-color: lightblue;
        border-radius: 50%;
        margin: 20px auto;
    }
</style>