<script>
    import Pizza from './Pizza.svelte';
    import { calculateVolume } from './volume.js';

    /**
     * @type {Array<{diameter: number, price: number}>}
     */
     export let pizzas;

    $: pizzaData = pizzas.map(pizza => {
        const volume = calculateVolume(pizza.diameter / 2);
        const pricePerVolume = pizza.price / volume;
        return {
            ...pizza,
            volume,
            pricePerVolume
        };
    });

    $: bestDeal = pizzaData.reduce((best, pizza) =>
        pizza.pricePerVolume < best.pricePerVolume ? pizza : best
    , pizzaData[0]);
</script>

<div class="comparison">
    <div class="stats-grid">
        {#each pizzaData as pizza}
            <div class="stat-card" class:best-deal={pizza.diameter === bestDeal.diameter}>
                {#if pizza.diameter === bestDeal.diameter}
                    <span class="deal-badge">🏆 BEST VALUE</span>
                {/if}
                <div class="size-badge">{pizza.diameter}"</div>
                <div class="stat-row">
                    <span class="stat-label">Volume:</span>
                    <span class="stat-value">{Number(pizza.volume).toFixed(1)} in³</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Price:</span>
                    <span class="stat-value price">${pizza.price}</span>
                </div>
                <div class="stat-row highlight">
                    <span class="stat-label">Per in³:</span>
                    <span class="stat-value">${Number(pizza.pricePerVolume).toFixed(3)}</span>
                </div>
            </div>
        {/each}
    </div>

    <div class="visual-comparison">
        <h4>🍕 Pizza per Dollar (visual)</h4>
        <p class="visual-hint">Bigger = more pizza for your money!</p>
        <div class="pizza-row">
            {#each pizzaData as pizza}
                <div class="pizza-item" class:winner={pizza.diameter === bestDeal.diameter}>
                    <Pizza radius={1 / pizza.pricePerVolume / 3} text="{pizza.diameter}in" />
                    {#if pizza.diameter === bestDeal.diameter}
                        <span class="winner-star">⭐</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .comparison {
        margin: 20px 0;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px;
        margin-bottom: 25px;
    }

    .stat-card {
        background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        padding: 15px;
        text-align: center;
        position: relative;
        transition: all 0.2s ease;
    }

    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .stat-card.best-deal {
        background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%);
        border-color: #4caf50;
        box-shadow: 0 5px 20px rgba(76, 175, 80, 0.3);
    }

    .deal-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(180deg, #ffd54f 0%, #ffb300 100%);
        color: #5d4037;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.7rem;
        font-weight: bold;
        white-space: nowrap;
    }

    .size-badge {
        font-family: 'Chewy', cursive;
        font-size: 1.8rem;
        color: #d32f2f;
        margin-bottom: 10px;
    }

    .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        font-size: 0.9rem;
        border-bottom: 1px dashed #e0e0e0;
    }

    .stat-row:last-child {
        border-bottom: none;
    }

    .stat-label {
        color: #757575;
    }

    .stat-value {
        font-weight: bold;
        color: #5d4037;
    }

    .stat-value.price {
        color: #2e7d32;
    }

    .stat-row.highlight {
        background: rgba(255, 183, 77, 0.2);
        margin: 5px -10px -5px -10px;
        padding: 8px 10px;
        border-radius: 0 0 10px 10px;
    }

    .visual-comparison {
        text-align: center;
        padding: 20px;
        background: linear-gradient(180deg, #fff8e1 0%, #ffecb3 100%);
        border-radius: 15px;
    }

    .visual-comparison h4 {
        margin: 0 0 5px 0;
    }

    .visual-hint {
        font-size: 0.9rem;
        color: #8d6e63;
        margin: 0 0 15px 0;
    }

    .pizza-row {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 10px;
        flex-wrap: wrap;
    }

    .pizza-item {
        position: relative;
        transition: transform 0.3s ease;
    }

    .pizza-item:hover {
        transform: scale(1.05);
    }

    .pizza-item.winner {
        animation: bounce 2s ease infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    .winner-star {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 1.5rem;
        animation: spin 3s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
