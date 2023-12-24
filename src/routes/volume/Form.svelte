<script>
    import PriceComparison from "./PriceComparison.svelte";

    let entries = [
        {
            diameter: 10,
            price: 7.85
        },
        {
            diameter: 12,
            price: 9.95
        },
    ]
</script>

{#each entries as entry, i}
    <div>
        <b>Pizza {i + 1} </b>
        <div>
        <i>size (in)</i> <input type="number" bind:value={entry.diameter} min="1">
        <i>price ($)</i> <input type="price" bind:value={entry.price} min="1">
        </div>
    </div>
{/each}

<PriceComparison pizzas={entries} />