<script>
    import Circle from './Circle.svelte';

    let diameter = 10;

    $: radius = diameter / 2;
    $: volume = Number(
                    Math.PI * Math.pow(radius, 2)
                ).toFixed(1);
</script>

<h1>Why you should (almost) always buy a bigger pizza</h1>

<p>The volume of a pizza doesn't scale linearly with its size. Instead, the volume is proportional to the square of the radius.</p>
<br />

<label>
    {diameter}in diameter
    <input type="range" bind:value={diameter} min="6" max="20">
</label>


<Circle {radius} />
<p>= {volume}in&#179; volume</p>

<br />
<p>This means that a larger pizza not only gives you more pizza but a <b>disproportionately</b> larger amount.</p>
<p><i>A 20" pizza is not 2 but <b>4 times</b> larger than a 10" pizza.</i></p>
<br />
<p>Furthermore, the relationship between a pizza's volume and it's price is not likely to be in alignment.</p>
<p>It is very difficult to perceive this difference, but in reality it is more than likely that you are paying a premium when ordering a smaller pie.</p>