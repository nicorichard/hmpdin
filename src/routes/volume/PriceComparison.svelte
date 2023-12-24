<script>
    import Pizza from './Pizza.svelte';
    import { calculateVolume } from './volume.js';

    /**
     * @type {Array<{diameter: number, price: number}>}
     */
     export let pizzas;
</script>

{#each pizzas as pizza}
    <p>
        A {pizza.diameter}in pizza has a volume of {Number(calculateVolume(pizza.diameter / 2)).toFixed(1)}in&#179; and costs ${pizza.price}.
        <br />
        <i>That's ${Number(pizza.price / calculateVolume(pizza.diameter / 2)).toFixed(2)} per in&#179;.</i>
    </p>
{/each}

<h6>Pizza per dollar</h6>
{#each pizzas as pizza}
    <Pizza radius={1 / (pizza.price / calculateVolume(pizza.diameter / 2)) / 3} text="{pizza.diameter.toString()}" />
{/each}