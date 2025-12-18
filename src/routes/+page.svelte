<script>
	import { calculateWithRestrictions } from './calculate.js';

	/** @type {import('./calculate.js').PizzaBreakdown | null} */
	let result = null;
	let showCelebration = false;

    let size = 14;

    let crustOptions = [
        {
            title: "thin",
            emoji: "📄",
            description: "crispy & light",
            multiplier: 1.4,
        },
        {
            title: "regular",
            emoji: "🍞",
            description: "classic & fluffy",
            multiplier: 1,
        }
    ];
    let crust = crustOptions[1];

    let hungerOptions = [
        {
            title: "snack",
            emoji: "🐭",
            description: "just a nibble",
            value: 2.5,
        },
        {
            title: "meal",
            emoji: "😋",
            description: "properly hungry",
            value: 3.5,
        },
        {
            title: "feast",
            emoji: "🦁",
            description: "RAVENOUS",
            value: 6,
        }
    ];
    let hunger = hungerOptions[1];

    // Dietary groups
    let dietaryGroups = {
        meatLovers: 0,
        flexible: 2,
        vegetarian: 0,
        halal: 0,
        glutenFree: 0
    };

    let dietaryOptions = [
        {
            key: 'meatLovers',
            emoji: '🥩',
            title: 'Meat Lovers',
            description: 'Need meat on their pizza!',
            color: '#d32f2f'
        },
        {
            key: 'flexible',
            emoji: '🤷',
            title: 'Flexible',
            description: 'Happy with anything',
            color: '#9e9e9e'
        },
        {
            key: 'vegetarian',
            emoji: '🥬',
            title: 'Vegetarian',
            description: 'No meat please',
            color: '#4caf50'
        },
        {
            key: 'halal',
            emoji: '☪️',
            title: 'Halal',
            description: 'Veggie is the safe bet',
            color: '#1976d2'
        },
        {
            key: 'glutenFree',
            emoji: '🌾',
            title: 'Gluten-Free',
            description: 'Needs separate GF pizza',
            color: '#ff9800'
        }
    ];

    $: totalPeople = Object.values(dietaryGroups).reduce((a, b) => a + b, 0);

	function handleSubmit() {
        if (totalPeople === 0) return;

        result = calculateWithRestrictions(
            hunger.value,
            dietaryGroups,
            size,
            crust.multiplier
        );
        showCelebration = true;
        setTimeout(() => showCelebration = false, 3000);
	}

    function onChange() {
        result = null;
        showCelebration = false;
    }

    function incrementGroup(key) {
        dietaryGroups[key]++;
        dietaryGroups = dietaryGroups; // trigger reactivity
        onChange();
    }

    function decrementGroup(key) {
        if (dietaryGroups[key] > 0) {
            dietaryGroups[key]--;
            dietaryGroups = dietaryGroups;
            onChange();
        }
    }

    // Generate random pizza slices for celebration
    function getRandomPizzas(count) {
        return Array(count).fill(null).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            rotation: Math.random() * 360,
            size: 1 + Math.random() * 1.5
        }));
    }

    $: celebrationPizzas = showCelebration ? getRandomPizzas(15) : [];

    // Complexity-based commentary
    const complexityMessages = {
        simple: [
            "Easy peasy! Just order and enjoy 🎉",
            "Simple order, simple life ✨",
            "No drama, just pizza 🍕"
        ],
        moderate: [
            "A few preferences to juggle, but totally manageable 👍",
            "Nothing the pizza place can't handle!",
            "Slightly spicy order, but you've got this 🌶️"
        ],
        complex: [
            "Okay, this is getting interesting... 🤔",
            "You might want to write this down before calling 📝",
            "Your pizza order has entered expert mode 🎮"
        ],
        chaotic: [
            "Whoa there! This order is a SITUATION 😅",
            "You might need a spreadsheet for this one 📊",
            "The pizza place is gonna need a minute... ⏰",
            "Congratulations, you've achieved pizza chaos! 🎊"
        ]
    };

    function getComplexityMessage(complexity) {
        const messages = complexityMessages[complexity] || complexityMessages.simple;
        return messages[Math.floor(Math.random() * messages.length)];
    }
</script>

{#if showCelebration}
    <div class="celebration">
        {#each celebrationPizzas as pizza (pizza.id)}
            <span
                class="flying-pizza"
                style="
                    left: {pizza.left}%;
                    animation-delay: {pizza.delay}s;
                    --rotation: {pizza.rotation}deg;
                    font-size: {pizza.size}rem;
                "
            >🍕</span>
        {/each}
    </div>
{/if}

<div class="calculator-intro">
    <h1>🍕 Pizza Calculator 🍕</h1>
    <p class="tagline">Never order too little (or too much) pizza again!</p>
</div>

<form on:submit|preventDefault={handleSubmit}>
    <div class="section">
        <h4>🍽️ How hungry is everyone?</h4>
        <div class="option-grid">
            {#each hungerOptions as level}
                <label class="option-card" class:selected={hunger === level}>
                    <input
                        type="radio"
                        bind:group={hunger}
                        value={level}
                        on:change={onChange}
                    />
                    <span class="option-emoji">{level.emoji}</span>
                    <span class="option-title">{level.title}</span>
                    <span class="option-desc">{level.description}</span>
                </label>
            {/each}
        </div>
    </div>

    <div class="section">
        <h4>🫓 What kind of crust?</h4>
        <div class="option-grid crust-grid">
            {#each crustOptions as option}
                <label class="option-card" class:selected={crust === option}>
                    <input
                        type="radio"
                        bind:group={crust}
                        value={option}
                        on:change={onChange}
                    />
                    <span class="option-emoji">{option.emoji}</span>
                    <span class="option-title">{option.title}</span>
                    <span class="option-desc">{option.description}</span>
                </label>
            {/each}
        </div>
    </div>

    <div class="section">
        <h4>📐 Pizza size</h4>
        <div class="size-control">
            <input
                bind:value={size}
                on:change={onChange}
                type="number"
                min="1"
            />
            <span class="unit">inches</span>
            <span class="size-hint">
                {#if size < 10}
                    personal pan 🤏
                {:else if size < 14}
                    medium pie 👌
                {:else if size < 18}
                    large pie 👍
                {:else}
                    absolute unit! 😱
                {/if}
            </span>
        </div>
    </div>

    <div class="section dietary-section">
        <h4>👥 Who's eating? <span class="total-badge">{totalPeople} total</span></h4>
        <p class="dietary-hint">Add people to each dietary category:</p>

        <div class="dietary-grid">
            {#each dietaryOptions as option}
                <div class="dietary-card" style="--accent-color: {option.color}">
                    <div class="dietary-header">
                        <span class="dietary-emoji">{option.emoji}</span>
                        <div class="dietary-info">
                            <span class="dietary-title">{option.title}</span>
                            <span class="dietary-desc">{option.description}</span>
                        </div>
                    </div>
                    <div class="dietary-controls">
                        <button
                            type="button"
                            class="count-btn minus"
                            on:click={() => decrementGroup(option.key)}
                            disabled={dietaryGroups[option.key] === 0}
                        >−</button>
                        <span class="count-value" class:has-value={dietaryGroups[option.key] > 0}>
                            {dietaryGroups[option.key]}
                        </span>
                        <button
                            type="button"
                            class="count-btn plus"
                            on:click={() => incrementGroup(option.key)}
                        >+</button>
                    </div>
                </div>
            {/each}
        </div>

        {#if totalPeople === 0}
            <div class="warning-box">
                <span class="warning-icon">⚠️</span>
                <span>Add at least one person to calculate!</span>
            </div>
        {/if}
    </div>

    <div class="submit-section">
        <button type="submit" disabled={totalPeople === 0}>
            🔥 Calculate the 'Za! 🔥
        </button>
    </div>

    {#if result}
        <div class="result" class:celebrating={showCelebration}>
            <div class="result-box complexity-{result.complexity}">
                <div class="complexity-banner">
                    {#if result.complexity === 'simple'}
                        <span class="complexity-icon">😎</span>
                        <span class="complexity-label">Simple Order</span>
                    {:else if result.complexity === 'moderate'}
                        <span class="complexity-icon">🤔</span>
                        <span class="complexity-label">Moderate Order</span>
                    {:else if result.complexity === 'complex'}
                        <span class="complexity-icon">😬</span>
                        <span class="complexity-label">Complex Order</span>
                    {:else}
                        <span class="complexity-icon">🤯</span>
                        <span class="complexity-label">Chaotic Order!</span>
                    {/if}
                </div>

                <div class="complexity-message">
                    {getComplexityMessage(result.complexity)}
                </div>

                <div class="total-pizzas">
                    <span class="result-label">You need</span>
                    <span class="result-number">{result.total}</span>
                    <span class="result-text">pizza{result.total > 1 ? 's' : ''}!</span>
                </div>

                <div class="pizza-breakdown">
                    {#if result.meat > 0}
                        <div class="breakdown-item meat">
                            <span class="breakdown-count">{result.meat}</span>
                            <span class="breakdown-type">🥩 Meat</span>
                        </div>
                    {/if}
                    {#if result.veggie > 0}
                        <div class="breakdown-item veggie">
                            <span class="breakdown-count">{result.veggie}</span>
                            <span class="breakdown-type">🥬 Veggie</span>
                        </div>
                    {/if}
                    {#if result.glutenFree > 0}
                        <div class="breakdown-item gf">
                            <span class="breakdown-count">{result.glutenFree}</span>
                            <span class="breakdown-type">🌾 GF</span>
                        </div>
                    {/if}
                </div>

                <div class="result-pizzas">
                    {#each Array(Math.min(result.total, 10)) as _, i}
                        <span class="result-pizza" style="animation-delay: {i * 0.1}s">🍕</span>
                    {/each}
                    {#if result.total > 10}
                        <span class="more-pizzas">+{result.total - 10} more!</span>
                    {/if}
                </div>

                {#if result.notes.length > 0}
                    <div class="order-notes">
                        <h5>📋 Order Notes:</h5>
                        <ul>
                            {#each result.notes as note}
                                <li>{note}</li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</form>

<div class="pro-tip">
    <span class="tip-icon">💡</span>
    <span class="tip-text"><strong>Pro tip:</strong> When in doubt, round up! Cold pizza breakfast is a thing.</span>
</div>

<style>
    .calculator-intro {
        text-align: center;
        margin-bottom: 30px;
    }

    .calculator-intro h1 {
        font-size: 2.5rem;
        margin-bottom: 5px;
    }

    .tagline {
        font-size: 1.2rem;
        color: #8d6e63;
        font-style: italic;
    }

    .section {
        margin-bottom: 25px;
    }

    .option-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }

    .crust-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 400px;
    }

    .option-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 10px;
        background: linear-gradient(180deg, #fff 0%, #faf6f3 100%);
        border: 3px solid #e0d5cf;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
    }

    .option-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, #ffcc80 0%, #ffb74d 100%);
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 0;
    }

    .option-card:hover {
        transform: translateY(-3px);
        border-color: #ffb74d;
        box-shadow: 0 5px 15px rgba(255, 183, 77, 0.3);
    }

    .option-card.selected {
        border-color: #ff8a65;
        box-shadow: 0 5px 20px rgba(255, 138, 101, 0.4);
    }

    .option-card.selected::before {
        opacity: 1;
    }

    .option-card input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .option-emoji {
        font-size: 2rem;
        position: relative;
        z-index: 1;
        transition: transform 0.2s ease;
    }

    .option-card:hover .option-emoji {
        transform: scale(1.2);
    }

    .option-card.selected .option-emoji {
        transform: scale(1.3);
        animation: wiggle 0.5s ease;
    }

    @keyframes wiggle {
        0%, 100% { transform: scale(1.3) rotate(0); }
        25% { transform: scale(1.3) rotate(-10deg); }
        75% { transform: scale(1.3) rotate(10deg); }
    }

    .option-title {
        font-family: 'Chewy', cursive;
        font-size: 1.3rem;
        color: #5d4037;
        margin-top: 5px;
        position: relative;
        z-index: 1;
        text-transform: capitalize;
    }

    .option-desc {
        font-size: 0.85rem;
        color: #8d6e63;
        position: relative;
        z-index: 1;
    }

    .size-control {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .unit {
        color: #8d6e63;
        font-size: 1rem;
    }

    .size-hint {
        font-size: 0.95rem;
        color: #ff7043;
        margin-left: 10px;
    }

    /* Dietary Section Styles */
    .dietary-section h4 {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .total-badge {
        background: linear-gradient(180deg, #4caf50 0%, #388e3c 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
    }

    .dietary-hint {
        color: #8d6e63;
        margin: 5px 0 15px 0;
        font-size: 0.95rem;
    }

    .dietary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 15px;
    }

    .dietary-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background: white;
        border: 3px solid #e0e0e0;
        border-radius: 15px;
        transition: all 0.2s ease;
    }

    .dietary-card:hover {
        border-color: var(--accent-color);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .dietary-header {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .dietary-emoji {
        font-size: 2rem;
    }

    .dietary-info {
        display: flex;
        flex-direction: column;
    }

    .dietary-title {
        font-family: 'Chewy', cursive;
        font-size: 1.2rem;
        color: #5d4037;
    }

    .dietary-desc {
        font-size: 0.8rem;
        color: #9e9e9e;
    }

    .dietary-controls {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .count-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #e0e0e0;
        background: white;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        padding: 0;
        line-height: 1;
        box-shadow: none;
    }

    .count-btn:hover:not(:disabled) {
        transform: scale(1.1);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    }

    .count-btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .count-btn.minus {
        color: #e53935;
        border-color: #ffcdd2;
    }

    .count-btn.minus:hover:not(:disabled) {
        background: #ffebee;
        border-color: #e53935;
    }

    .count-btn.plus {
        color: #43a047;
        border-color: #c8e6c9;
    }

    .count-btn.plus:hover:not(:disabled) {
        background: #e8f5e9;
        border-color: #43a047;
    }

    .count-value {
        font-family: 'Chewy', cursive;
        font-size: 1.8rem;
        min-width: 40px;
        text-align: center;
        color: #bdbdbd;
        transition: all 0.2s ease;
    }

    .count-value.has-value {
        color: #5d4037;
    }

    .warning-box {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 15px;
        padding: 12px 20px;
        background: #fff3e0;
        border: 2px solid #ffb74d;
        border-radius: 10px;
        color: #e65100;
    }

    .warning-icon {
        font-size: 1.3rem;
    }

    .submit-section {
        text-align: center;
        margin: 40px 0;
    }

    button[type="submit"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none !important;
    }

    /* Result Styles */
    .result {
        margin-top: 30px;
        animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
    }

    .result-box {
        background: linear-gradient(180deg, #fff9c4 0%, #fff59d 100%);
        border: 4px solid #ffd54f;
        border-radius: 20px;
        padding: 25px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(255, 213, 79, 0.4);
    }

    .result-box.complexity-simple {
        background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%);
        border-color: #81c784;
    }

    .result-box.complexity-moderate {
        background: linear-gradient(180deg, #fff9c4 0%, #fff59d 100%);
        border-color: #ffd54f;
    }

    .result-box.complexity-complex {
        background: linear-gradient(180deg, #fff3e0 0%, #ffe0b2 100%);
        border-color: #ffb74d;
    }

    .result-box.complexity-chaotic {
        background: linear-gradient(180deg, #ffebee 0%, #ffcdd2 100%);
        border-color: #ef9a9a;
        animation: shake 0.5s ease;
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px) rotate(-1deg); }
        75% { transform: translateX(5px) rotate(1deg); }
    }

    .complexity-banner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .complexity-icon {
        font-size: 2rem;
    }

    .complexity-label {
        font-family: 'Chewy', cursive;
        font-size: 1.3rem;
        color: #5d4037;
    }

    .complexity-message {
        font-size: 1rem;
        color: #8d6e63;
        margin-bottom: 20px;
        font-style: italic;
    }

    .total-pizzas {
        margin-bottom: 20px;
    }

    .result-label {
        display: block;
        font-size: 1.2rem;
        color: #5d4037;
    }

    .result-number {
        display: block;
        font-family: 'Chewy', cursive;
        font-size: 5rem;
        color: #d32f2f;
        line-height: 1;
        text-shadow: 3px 3px 0 #ffcc80;
        animation: pulse 1s ease infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .result-text {
        display: block;
        font-family: 'Chewy', cursive;
        font-size: 2rem;
        color: #5d4037;
    }

    .pizza-breakdown {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .breakdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 20px;
        border-radius: 15px;
        min-width: 80px;
    }

    .breakdown-item.meat {
        background: linear-gradient(180deg, #ffcdd2 0%, #ef9a9a 100%);
    }

    .breakdown-item.veggie {
        background: linear-gradient(180deg, #c8e6c9 0%, #a5d6a7 100%);
    }

    .breakdown-item.gf {
        background: linear-gradient(180deg, #ffe0b2 0%, #ffcc80 100%);
    }

    .breakdown-count {
        font-family: 'Chewy', cursive;
        font-size: 2rem;
        color: #5d4037;
    }

    .breakdown-type {
        font-size: 0.9rem;
        color: #5d4037;
    }

    .result-pizzas {
        margin: 20px 0;
        font-size: 2rem;
    }

    .result-pizza {
        display: inline-block;
        animation: dropIn 0.5s ease backwards;
    }

    @keyframes dropIn {
        0% { transform: translateY(-50px) rotate(180deg); opacity: 0; }
        100% { transform: translateY(0) rotate(0); opacity: 1; }
    }

    .more-pizzas {
        display: inline-block;
        background: #ff7043;
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 1rem;
        margin-left: 10px;
        vertical-align: middle;
    }

    .order-notes {
        margin-top: 20px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 15px;
        text-align: left;
    }

    .order-notes h5 {
        margin: 0 0 10px 0;
        font-family: 'Chewy', cursive;
        font-size: 1.2rem;
        color: #5d4037;
    }

    .order-notes ul {
        margin: 0;
        padding-left: 0;
        list-style: none;
    }

    .order-notes li {
        padding: 8px 0;
        border-bottom: 1px dashed #e0e0e0;
        font-size: 0.95rem;
    }

    .order-notes li:last-child {
        border-bottom: none;
    }

    .pro-tip {
        margin-top: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border-radius: 15px;
        border-left: 5px solid #2196f3;
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .tip-icon {
        font-size: 2rem;
    }

    .tip-text {
        font-size: 1rem;
    }

    /* Celebration overlay */
    .celebration {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    }

    .flying-pizza {
        position: absolute;
        top: -50px;
        animation: fall 3s ease-in forwards;
    }

    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(calc(100vh + 100px)) rotate(var(--rotation));
            opacity: 0;
        }
    }

    /* Responsive adjustments */
    @media (max-width: 600px) {
        .option-grid {
            grid-template-columns: 1fr;
        }

        .crust-grid {
            grid-template-columns: 1fr;
        }

        .dietary-grid {
            grid-template-columns: 1fr;
        }

        .result-number {
            font-size: 4rem;
        }

        .pizza-breakdown {
            gap: 10px;
        }

        .breakdown-item {
            padding: 10px 15px;
            min-width: 70px;
        }
    }
</style>
