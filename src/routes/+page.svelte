<script>
	import calculate from './calculate.js';

	let result = 0;
	let showCelebration = false;

    let size = 14;
    let people = 1;
    let vegetarians = 0;

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

	function handleSubmit() {
        result = calculate(hunger.value, people, size, crust.multiplier, vegetarians);
        showCelebration = true;
        setTimeout(() => showCelebration = false, 3000);
	}

    function onChange() {
        result = 0;
        showCelebration = false;

        if (vegetarians > people) {
            vegetarians = people;
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

    <div class="section numbers-section">
        <div class="number-input">
            <h4>📐 Pizza size</h4>
            <div class="input-with-unit">
                <input
                    bind:value={size}
                    on:change={onChange}
                    type="number"
                    min="1"
                />
                <span class="unit">inches</span>
            </div>
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

        <div class="number-input">
            <h4>👥 People eating</h4>
            <input
                bind:value={people}
                on:change={onChange}
                type="number"
                min="1"
            />
            <span class="people-hint">
                {#if people === 1}
                    just you? self care! 💅
                {:else if people <= 4}
                    cozy group 🏠
                {:else if people <= 10}
                    party time! 🎉
                {:else}
                    feeding an army! 🎪
                {/if}
            </span>
        </div>

        <div class="number-input">
            <h4>🥬 Vegetarians</h4>
            <input
                bind:value={vegetarians}
                on:change={onChange}
                type="number"
                min="0"
                max={people}
            />
            <span class="veg-hint">
                {#if vegetarians === 0}
                    meat lovers only 🥩
                {:else if vegetarians === people}
                    all veggie! 🌱
                {:else}
                    mixed crowd 🥗
                {/if}
            </span>
        </div>
    </div>

    <div class="submit-section">
        <button type="submit">
            🔥 Calculate the 'Za! 🔥
        </button>
    </div>

    {#if result > 0}
        <div class="result" class:celebrating={showCelebration}>
            <div class="result-box">
                <span class="result-label">You need</span>
                <span class="result-number">{result}</span>
                <span class="result-text">pizza{result > 1 ? "s" : ""}!</span>

                <div class="result-pizzas">
                    {#each Array(Math.min(result, 10)) as _, i}
                        <span class="result-pizza" style="animation-delay: {i * 0.1}s">🍕</span>
                    {/each}
                    {#if result > 10}
                        <span class="more-pizzas">+{result - 10} more!</span>
                    {/if}
                </div>

                {#if vegetarians > 0}
                    <div class="veggie-note">
                        <span class="veggie-icon">🌿</span>
                        Remember: at least {Math.ceil(result * (vegetarians / people))} should be veggie-friendly!
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

    .numbers-section {
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .number-input {
        text-align: center;
        flex: 1;
        min-width: 150px;
    }

    .number-input h4 {
        margin-bottom: 10px;
    }

    .input-with-unit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .unit {
        color: #8d6e63;
        font-size: 1rem;
    }

    .size-hint, .people-hint, .veg-hint {
        display: block;
        margin-top: 8px;
        font-size: 0.9rem;
        color: #ff7043;
        min-height: 1.5em;
    }

    .submit-section {
        text-align: center;
        margin: 40px 0;
    }

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
        padding: 30px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(255, 213, 79, 0.4);
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

    .result-pizzas {
        margin-top: 20px;
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

    .veggie-note {
        margin-top: 20px;
        padding: 15px;
        background: linear-gradient(180deg, #c8e6c9 0%, #a5d6a7 100%);
        border-radius: 12px;
        color: #2e7d32;
        font-size: 1rem;
    }

    .veggie-icon {
        margin-right: 8px;
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

        .numbers-section {
            flex-direction: column;
            align-items: center;
        }

        .result-number {
            font-size: 4rem;
        }
    }
</style>
