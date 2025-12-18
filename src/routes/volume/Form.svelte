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

    function addPizza() {
        entries = [...entries, { diameter: 14, price: 11.99 }];
    }

    function removePizza(index) {
        entries = entries.filter((_, i) => i !== index);
    }
</script>

<div class="form-container">
    <div class="entries">
        {#each entries as entry, i}
            <div class="entry-card">
                <div class="entry-header">
                    <span class="pizza-icon">🍕</span>
                    <span class="pizza-label">Pizza {i + 1}</span>
                    {#if entries.length > 2}
                        <button class="remove-btn" on:click={() => removePizza(i)} title="Remove pizza">
                            ✕
                        </button>
                    {/if}
                </div>
                <div class="entry-fields">
                    <div class="field">
                        <label for="size-{i}">Size (inches)</label>
                        <input
                            id="size-{i}"
                            type="number"
                            bind:value={entry.diameter}
                            min="1"
                            max="50"
                        >
                    </div>
                    <div class="field">
                        <label for="price-{i}">Price ($)</label>
                        <input
                            id="price-{i}"
                            type="number"
                            bind:value={entry.price}
                            min="0.01"
                            step="0.01"
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#if entries.length < 5}
        <button class="add-btn" on:click={addPizza}>
            <span class="add-icon">+</span>
            Add Another Pizza
        </button>
    {/if}

    <div class="results">
        <h4>📊 Comparison Results</h4>
        <PriceComparison pizzas={entries} />
    </div>
</div>

<style>
    .form-container {
        margin-top: 20px;
    }

    .entries {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
    }

    .entry-card {
        background: white;
        border: 3px solid #e0e0e0;
        border-radius: 15px;
        padding: 15px;
        transition: all 0.2s ease;
    }

    .entry-card:hover {
        border-color: #ffb74d;
        box-shadow: 0 5px 15px rgba(255, 183, 77, 0.2);
    }

    .entry-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px dashed #f0f0f0;
    }

    .pizza-icon {
        font-size: 1.5rem;
    }

    .pizza-label {
        font-family: 'Chewy', cursive;
        font-size: 1.2rem;
        color: #5d4037;
        flex: 1;
    }

    .remove-btn {
        background: #ffebee;
        border: 2px solid #ef9a9a;
        color: #c62828;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 0.9rem;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: none;
    }

    .remove-btn:hover {
        background: #ef5350;
        border-color: #ef5350;
        color: white;
        transform: scale(1.1);
        box-shadow: 0 3px 10px rgba(239, 83, 80, 0.3);
    }

    .entry-fields {
        display: flex;
        gap: 15px;
    }

    .field {
        flex: 1;
    }

    .field label {
        display: block;
        font-size: 0.85rem;
        color: #757575;
        margin-bottom: 5px;
    }

    .field input {
        width: 100%;
        box-sizing: border-box;
    }

    .add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 15px;
        background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
        border: 3px dashed #bdbdbd;
        border-radius: 15px;
        cursor: pointer;
        font-family: 'Patrick Hand', cursive;
        font-size: 1.1rem;
        color: #757575;
        transition: all 0.2s ease;
        margin-bottom: 25px;
        box-shadow: none;
    }

    .add-btn:hover {
        border-color: #4caf50;
        color: #4caf50;
        background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%);
        transform: none;
        box-shadow: none;
    }

    .add-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .results {
        background: white;
        border-radius: 15px;
        padding: 20px;
        border: 2px solid #e0e0e0;
    }

    .results h4 {
        margin: 0 0 15px 0;
        text-align: center;
    }
</style>
