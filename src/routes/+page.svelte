<script>
	import { calculateWithRestrictions } from './calculate.js';

	/** @type {import('./calculate.js').PizzaBreakdown | null} */
	let result = null;

    let size = 14;

    let crustOptions = [
        { title: "thin", emoji: "📄", multiplier: 1.4 },
        { title: "regular", emoji: "🍞", multiplier: 1 }
    ];
    let crust = crustOptions[1];

    let hungerOptions = [
        { title: "snack", emoji: "🐭", value: 2.5 },
        { title: "meal", emoji: "😋", value: 3.5 },
        { title: "feast", emoji: "🦁", value: 6 }
    ];
    let hunger = hungerOptions[1];

    let dietaryGroups = {
        meatLovers: 0,
        flexible: 2,
        vegetarian: 0,
        halal: 0,
        glutenFree: 0
    };

    let dietaryOptions = [
        { key: 'meatLovers', emoji: '🥩', title: 'Meat Lovers' },
        { key: 'flexible', emoji: '🤷', title: 'Flexible' },
        { key: 'vegetarian', emoji: '🥬', title: 'Vegetarian' },
        { key: 'halal', emoji: '☪️', title: 'Halal' },
        { key: 'glutenFree', emoji: '🌾', title: 'Gluten-Free' }
    ];

    $: totalPeople = Object.values(dietaryGroups).reduce((a, b) => a + b, 0);

	function handleSubmit() {
        if (totalPeople === 0) return;
        result = calculateWithRestrictions(hunger.value, dietaryGroups, size, crust.multiplier);
	}

    function onChange() {
        result = null;
    }

    function incrementGroup(key) {
        dietaryGroups[key]++;
        dietaryGroups = dietaryGroups;
        onChange();
    }

    function decrementGroup(key) {
        if (dietaryGroups[key] > 0) {
            dietaryGroups[key]--;
            dietaryGroups = dietaryGroups;
            onChange();
        }
    }
</script>

<div class="calculator-intro">
    <h1>🍕 How Many Pizzas?</h1>
</div>

<form on:submit|preventDefault={handleSubmit}>
    <div class="section">
        <h4>Hunger level</h4>
        <div class="option-grid">
            {#each hungerOptions as level}
                <label class="option-card" class:selected={hunger === level}>
                    <input type="radio" bind:group={hunger} value={level} on:change={onChange} />
                    <span class="option-emoji">{level.emoji}</span>
                    <span class="option-title">{level.title}</span>
                </label>
            {/each}
        </div>
    </div>

    <div class="section">
        <h4>Crust</h4>
        <div class="option-grid crust-grid">
            {#each crustOptions as option}
                <label class="option-card" class:selected={crust === option}>
                    <input type="radio" bind:group={crust} value={option} on:change={onChange} />
                    <span class="option-emoji">{option.emoji}</span>
                    <span class="option-title">{option.title}</span>
                </label>
            {/each}
        </div>
    </div>

    <div class="section">
        <h4>Pizza size</h4>
        <div class="size-control">
            <input bind:value={size} on:change={onChange} type="number" min="1" />
            <span class="unit">inches</span>
        </div>
    </div>

    <div class="section dietary-section">
        <h4>Who's eating? <span class="total-badge">{totalPeople}</span></h4>

        <div class="dietary-grid">
            {#each dietaryOptions as option}
                <div class="dietary-card">
                    <div class="dietary-header">
                        <span class="dietary-emoji">{option.emoji}</span>
                        <span class="dietary-title">{option.title}</span>
                    </div>
                    <div class="dietary-controls">
                        <button type="button" class="count-btn minus" on:click={() => decrementGroup(option.key)} disabled={dietaryGroups[option.key] === 0}>−</button>
                        <span class="count-value" class:has-value={dietaryGroups[option.key] > 0}>{dietaryGroups[option.key]}</span>
                        <button type="button" class="count-btn plus" on:click={() => incrementGroup(option.key)}>+</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="submit-section">
        <button type="submit" disabled={totalPeople === 0}>Calculate</button>
    </div>

    {#if result}
        <div class="result">
            <div class="result-box">
                <div class="total-pizzas">
                    <span class="result-number">{result.total}</span>
                    <span class="result-text">pizza{result.total !== 1 ? 's' : ''}</span>
                </div>

                {#if result.meat > 0 || result.veggie > 0 || result.glutenFree > 0}
                    <div class="pizza-breakdown">
                        {#if result.meat > 0}
                            <div class="breakdown-item meat">
                                <span class="breakdown-count">{result.meat}</span>
                                <span class="breakdown-type">🥩 meat</span>
                            </div>
                        {/if}
                        {#if result.veggie > 0}
                            <div class="breakdown-item veggie">
                                <span class="breakdown-count">{result.veggie}</span>
                                <span class="breakdown-type">🥬 veggie</span>
                            </div>
                        {/if}
                        {#if result.glutenFree > 0}
                            <div class="breakdown-item gf">
                                <span class="breakdown-count">{result.glutenFree}</span>
                                <span class="breakdown-type">🌾 GF</span>
                            </div>
                        {/if}
                    </div>
                {/if}

                {#if dietaryGroups.halal > 0}
                    <p class="halal-note">Veggie is the safe bet for halal unless your spot has halal meat.</p>
                {/if}
            </div>
        </div>
    {/if}
</form>

<style>
    .calculator-intro {
        text-align: center;
        margin-bottom: 30px;
    }

    .calculator-intro h1 {
        font-size: 2.2rem;
        margin-bottom: 5px;
    }

    .section {
        margin-bottom: 25px;
    }

    .option-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .crust-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 300px;
    }

    .option-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 8px;
        background: white;
        border: 3px solid #e0d5cf;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .option-card:hover {
        border-color: #ffb74d;
    }

    .option-card.selected {
        border-color: #ff8a65;
        background: linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%);
    }

    .option-card input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .option-emoji {
        font-size: 1.8rem;
    }

    .option-title {
        font-family: 'Chewy', cursive;
        font-size: 1.1rem;
        color: #5d4037;
        margin-top: 4px;
    }

    .size-control {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .unit {
        color: #8d6e63;
    }

    .dietary-section h4 {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .total-badge {
        background: #5d4037;
        color: white;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 0.9rem;
    }

    .dietary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
    }

    .dietary-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
    }

    .dietary-header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .dietary-emoji {
        font-size: 1.4rem;
    }

    .dietary-title {
        font-family: 'Chewy', cursive;
        font-size: 1rem;
        color: #5d4037;
    }

    .dietary-controls {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .count-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid #e0e0e0;
        background: white;
        font-size: 1.3rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        box-shadow: none;
        transition: all 0.15s ease;
    }

    .count-btn:hover:not(:disabled) {
        transform: scale(1.1);
    }

    .count-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .count-btn.minus { color: #e53935; }
    .count-btn.plus { color: #43a047; }

    .count-value {
        font-family: 'Chewy', cursive;
        font-size: 1.4rem;
        min-width: 30px;
        text-align: center;
        color: #bdbdbd;
    }

    .count-value.has-value {
        color: #5d4037;
    }

    .submit-section {
        text-align: center;
        margin: 30px 0;
    }

    button[type="submit"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .result {
        margin-top: 20px;
    }

    .result-box {
        background: linear-gradient(180deg, #fff9c4 0%, #fff59d 100%);
        border: 4px solid #ffd54f;
        border-radius: 16px;
        padding: 24px;
        text-align: center;
    }

    .total-pizzas {
        margin-bottom: 16px;
    }

    .result-number {
        display: block;
        font-family: 'Chewy', cursive;
        font-size: 4.5rem;
        color: #d32f2f;
        line-height: 1;
    }

    .result-text {
        font-family: 'Chewy', cursive;
        font-size: 1.5rem;
        color: #5d4037;
    }

    .pizza-breakdown {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
    }

    .breakdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 16px;
        border-radius: 12px;
    }

    .breakdown-item.meat { background: #ffcdd2; }
    .breakdown-item.veggie { background: #c8e6c9; }
    .breakdown-item.gf { background: #ffe0b2; }

    .breakdown-count {
        font-family: 'Chewy', cursive;
        font-size: 1.6rem;
        color: #5d4037;
    }

    .breakdown-type {
        font-size: 0.85rem;
        color: #5d4037;
    }

    .halal-note {
        margin-top: 16px;
        font-size: 0.9rem;
        color: #5d4037;
        font-style: italic;
    }

    @media (max-width: 500px) {
        .option-grid, .crust-grid {
            grid-template-columns: 1fr;
        }
        .dietary-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
