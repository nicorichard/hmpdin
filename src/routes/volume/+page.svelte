<script>
    import Circle from './Circle.svelte';

    let diameter = 10;

    function calculateVolume(radius) {
        return Math.PI * Math.pow(radius, 2);
    }

    $: radius = diameter / 2;
    $: volume = Number(calculateVolume(radius)).toFixed(1);

    let dominosPizzas = [
        {
            diameter: 10,
            price: 7.85
        },
        {
            diameter: 12,
            price: 9.95
        },
        {
            diameter: 14,
            price: 12.60
        },
        {
            diameter: 16,
            price: 14.70
        }
    ]

    let santaLuciaPizzas = [
        {
            diameter: 10,
            price: 20.40
        },
        {
            diameter: 13,
            price: 29.20
        },
        {
            diameter: 15,
            price: 36.60
        },
        {
            diameter: 18,
            price: 47.35
        },
        {
            diameter: 30,
            price: 112.95
        }
    ]
</script>

<h1>Why you should (almost) always buy a bigger pizza</h1>

<p>The volume of a pizza doesn't scale linearly with its size. Instead, a pizza's volume is proportional to the square of the radius.</p>

<label>
    {diameter}in diameter
    <input type="range" bind:value={diameter} min="6" max="20">
    {volume}in&#179; volume
    <div>
        <Circle {radius} />
    </div>
</label>



<p>
    This means that a larger pizza not only gives you more pizza but a <b>disproportionately</b> larger amount.
    <i>A 20" pizza is not 2 but <b>4 times</b> larger than a 10" pizza.</i>
</p>
<p>
    Furthermore, the relationship between a pizza's volume and it's price is not likely to be in alignment.
</p>
<p>
    It is very difficult to perceive this difference, but in reality it is more than likely that you are paying a premium when ordering a smaller pie.
</p>
<br />

<h2>Take a look at some examples</h2>
<h3>Dominos</h3>
{#each dominosPizzas as pizza}
    <p>
        A {pizza.diameter}in pizza has a volume of {Number(calculateVolume(pizza.diameter / 2)).toFixed(1)}in&#179; and costs ${pizza.price}.
        <br />
        <i>That's ${Number(pizza.price / calculateVolume(pizza.diameter / 2)).toFixed(2)} per in&#179;.</i>
    </p>
{/each}

<h6>Pizza per dollar</h6>
{#each dominosPizzas as pizza}
    <Circle radius={1 / (pizza.price / calculateVolume(pizza.diameter / 2)) / 4} text="{pizza.diameter}" />
{/each}

<h3>Santa Lucia</h3>
{#each santaLuciaPizzas as pizza}
    <p>
        A {pizza.diameter}in pizza has a volume of {Number(calculateVolume(pizza.diameter / 2)).toFixed(1)}in&#179; and costs ${pizza.price}.
        <br />
        <i>That's ${Number(pizza.price / calculateVolume(pizza.diameter / 2)).toFixed(2)} per in&#179;.</i>

    </p>
{/each}

<h6>Pizza per dollar</h6>
{#each santaLuciaPizzas as pizza}
    <Circle radius={1 / (pizza.price / calculateVolume(pizza.diameter / 2)) / 4} text="{pizza.diameter}" />
{/each}