<script>
    import { comparisons } from './comparisons.js';
    import PriceComparison from './PriceComparison.svelte';
    import Form from './Form.svelte';
    import DiameterSlider from './DiameterSlider.svelte';
</script>

<div class="volume-page">
    <div class="intro">
        <h1>🔬 Pizza Math 101 🔬</h1>
        <p class="subtitle">The science of getting more pizza for your money</p>
    </div>

    <section class="key-insight">
        <div class="insight-card">
            <span class="lightbulb">💡</span>
            <h2>The Big Secret</h2>
            <p>
                Pizza volume doesn't scale <em>linearly</em> with diameter.
                It scales with the <strong>square</strong> of the radius!
            </p>
            <div class="formula">
                <span class="formula-text">Area = π × r²</span>
                <span class="formula-note">(it's just math, but it's delicious math)</span>
            </div>
        </div>
    </section>

    <section class="slider-section">
        <h2>🎚️ Play with the Pizza Slider</h2>
        <p>Drag to see how pizza volume changes with diameter:</p>
        <DiameterSlider />
    </section>

    <section class="explanation">
        <div class="fact-box">
            <span class="fact-icon">🤯</span>
            <div class="fact-content">
                <h3>Mind = Blown</h3>
                <p>
                    A <strong>20" pizza</strong> isn't just twice as big as a <strong>10" pizza</strong>...
                    it's <strong class="big-number">4 TIMES</strong> bigger!
                </p>
            </div>
        </div>

        <div class="why-matters">
            <h3>Why This Matters for Your Wallet</h3>
            <p>
                Pizza prices rarely reflect this reality. The price of a large pizza is almost never
                4x the price of a small. This means:
            </p>
            <ul class="benefits-list">
                <li>
                    <span class="benefit-icon">💰</span>
                    <span>Bigger pizzas = better value per square inch</span>
                </li>
                <li>
                    <span class="benefit-icon">🧠</span>
                    <span>You're smarter than the pizza pricing algorithm</span>
                </li>
                <li>
                    <span class="benefit-icon">🍕</span>
                    <span>More pizza = more happiness (science)</span>
                </li>
            </ul>
        </div>
    </section>

    <section class="examples">
        <h2>📊 Real World Examples</h2>
        <p class="examples-intro">
            Check out actual pizza prices from popular chains and see the price-per-volume difference:
        </p>

        {#each comparisons as comparison}
            <div class="comparison-section">
                <h3>
                    <span class="store-icon">🏪</span>
                    {comparison.name}
                </h3>
                <PriceComparison pizzas={comparison.pizzas} />
            </div>
        {/each}
    </section>

    <section class="calculator">
        <h2>🧮 Compare Your Own Pizzas</h2>
        <p>Got two pizza options? Enter them below and see which is the better deal:</p>
        <Form />
    </section>

    <section class="pro-tips">
        <h2>🎓 Pizza Pro Tips</h2>
        <div class="tips-grid">
            <div class="tip">
                <span class="tip-number">1</span>
                <p>Always calculate price-per-square-inch when comparing sizes</p>
            </div>
            <div class="tip">
                <span class="tip-number">2</span>
                <p>A medium + small often costs more than a large for less pizza</p>
            </div>
            <div class="tip">
                <span class="tip-number">3</span>
                <p>The "party size" is almost always the best deal</p>
            </div>
            <div class="tip">
                <span class="tip-number">4</span>
                <p>Leftovers are never a bad thing (cold pizza exists)</p>
            </div>
        </div>
    </section>
</div>

<style>
    .volume-page {
        max-width: 800px;
        margin: 0 auto;
    }

    .intro {
        text-align: center;
        margin-bottom: 30px;
    }

    .intro h1 {
        font-size: 2.5rem;
        margin-bottom: 5px;
    }

    .subtitle {
        font-size: 1.2rem;
        color: #8d6e63;
        font-style: italic;
    }

    section {
        margin-bottom: 40px;
    }

    .key-insight {
        text-align: center;
    }

    .insight-card {
        background: linear-gradient(180deg, #fff9c4 0%, #fff59d 100%);
        padding: 30px;
        border-radius: 20px;
        border: 4px solid #ffd54f;
        box-shadow: 0 5px 20px rgba(255, 213, 79, 0.3);
    }

    .lightbulb {
        font-size: 4rem;
        display: block;
        animation: glow 2s ease-in-out infinite;
    }

    @keyframes glow {
        0%, 100% { filter: drop-shadow(0 0 5px rgba(255, 235, 59, 0.5)); }
        50% { filter: drop-shadow(0 0 20px rgba(255, 235, 59, 0.8)); }
    }

    .insight-card h2 {
        margin: 15px 0 10px 0;
    }

    .formula {
        margin-top: 20px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
    }

    .formula-text {
        font-family: 'Chewy', cursive;
        font-size: 2rem;
        color: #d32f2f;
    }

    .formula-note {
        display: block;
        font-size: 0.9rem;
        color: #8d6e63;
        margin-top: 5px;
    }

    .slider-section {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        padding: 30px;
        border-radius: 20px;
        text-align: center;
    }

    .slider-section h2 {
        margin-top: 0;
    }

    .fact-box {
        display: flex;
        align-items: center;
        gap: 20px;
        background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 25px;
    }

    .fact-icon {
        font-size: 4rem;
        flex-shrink: 0;
    }

    .fact-content h3 {
        margin: 0 0 10px 0;
        color: #c2185b;
    }

    .fact-content p {
        margin: 0;
    }

    .big-number {
        font-family: 'Chewy', cursive;
        font-size: 1.5em;
        color: #d32f2f;
        animation: pulse 1s ease infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    .why-matters {
        background: #fafafa;
        padding: 25px;
        border-radius: 15px;
        border-left: 5px solid #4caf50;
    }

    .why-matters h3 {
        margin-top: 0;
    }

    .benefits-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .benefits-list li {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 12px 0;
        border-bottom: 1px dashed #e0e0e0;
    }

    .benefits-list li:last-child {
        border-bottom: none;
    }

    .benefit-icon {
        font-size: 1.5rem;
    }

    .examples-intro {
        margin-bottom: 25px;
    }

    .comparison-section {
        margin-bottom: 35px;
        padding: 20px;
        background: white;
        border-radius: 15px;
        border: 2px solid #e0e0e0;
    }

    .comparison-section h3 {
        margin-top: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .store-icon {
        font-size: 1.5rem;
    }

    .calculator {
        background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%);
        padding: 30px;
        border-radius: 20px;
    }

    .calculator h2 {
        margin-top: 0;
    }

    .pro-tips {
        text-align: center;
    }

    .tips-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-top: 20px;
    }

    .tip {
        background: white;
        padding: 20px;
        border-radius: 15px;
        border: 2px solid #ffcc80;
        position: relative;
        text-align: left;
    }

    .tip-number {
        position: absolute;
        top: -15px;
        left: 15px;
        background: linear-gradient(180deg, #ff8a65 0%, #ff7043 100%);
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Chewy', cursive;
        font-size: 1.2rem;
    }

    .tip p {
        margin: 0;
        padding-top: 5px;
    }

    @media (max-width: 600px) {
        .fact-box {
            flex-direction: column;
            text-align: center;
        }

        .tips-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
