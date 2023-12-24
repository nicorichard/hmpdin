<script>
    import { comparisons } from './comparisons.js';
    import PriceComparison from './PriceComparison.svelte';
    import Form from './Form.svelte';
    import DiameterSlider from './DiameterSlider.svelte';
</script>

<h1>Why you should (almost) always buy a bigger pizza</h1>

<p>The volume of a pizza doesn't scale linearly with its size. Instead, a pizza's volume is proportional to the square of the radius.</p>

<DiameterSlider />

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

<h2>Take a look at some examples</h2>

{#each comparisons as comparison}
    <h3>{comparison.name}</h3>
    <PriceComparison pizzas={comparison.pizzas} />
{/each}

<h2>Compare other pizzas</h2>
<Form />