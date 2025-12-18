<script>
    let pizzaFacts = [
        { emoji: "🌍", fact: "Americans eat approximately 100 acres of pizza every day" },
        { emoji: "🎃", fact: "The most popular pizza topping in the US is pepperoni" },
        { emoji: "👨‍🍳", fact: "The first pizzeria in America opened in 1905 in NYC" },
        { emoji: "🌙", fact: "Pizza Hut once delivered to the International Space Station" },
        { emoji: "📏", fact: "The largest pizza ever made was 131 feet in diameter" },
        { emoji: "🧀", fact: "Mozzarella is the most popular cheese for pizza worldwide" },
    ];

    let currentFactIndex = 0;

    function nextFact() {
        currentFactIndex = (currentFactIndex + 1) % pizzaFacts.length;
    }

    let crustPun = [
        "We knead this.",
        "In crust we trust.",
        "You want a pizza me?",
        "This is the yeast I can do.",
        "Don't be so cheesy!",
        "Slice, slice, baby.",
    ];

    $: randomPun = crustPun[Math.floor(Math.random() * crustPun.length)];
</script>

<div class="about-page">
    <h1>About HMPDIN</h1>

    <div class="tagline-box">
        <span class="quote-mark">"</span>
        <span class="tagline">{randomPun}</span>
        <span class="quote-mark">"</span>
    </div>

    <section class="story">
        <h2>The Origin Story</h2>
        <p>
            Picture this: You're planning a party. Everyone's hyped. You order pizza.
            Then... <strong>disaster</strong>. 🍕💨
        </p>
        <p>
            Either you've got 3 pizzas for 20 people (chaos ensues, friendships tested)
            or 15 pizzas for 6 people (cold pizza for the next month... actually that's fine).
        </p>
        <p>
            <strong>HMPDIN</strong> was born from this eternal struggle. We're here to bring
            <em>mathematical precision</em> to your pizza ordering, because nobody should have to
            do division while hungry.
        </p>
    </section>

    <section class="mission">
        <div class="mission-card">
            <span class="mission-icon">🎯</span>
            <h3>Our Mission</h3>
            <p>To eliminate pizza uncertainty from the universe, one calculation at a time.</p>
        </div>

        <div class="mission-card">
            <span class="mission-icon">🔬</span>
            <h3>The Science</h3>
            <p>We use advanced algorithms* to determine optimal pizza quantities.</p>
            <small>*It's just math, but "algorithms" sounds cooler</small>
        </div>

        <div class="mission-card">
            <span class="mission-icon">❤️</span>
            <h3>Made With Love</h3>
            <p>And cheese. Lots of cheese. Metaphorically. The website is dairy-free.</p>
        </div>
    </section>

    <section class="fun-fact">
        <h2>Pizza Fun Facts</h2>
        <div class="fact-card" on:click={nextFact} on:keypress={nextFact} role="button" tabindex="0">
            <span class="fact-emoji">{pizzaFacts[currentFactIndex].emoji}</span>
            <p class="fact-text">{pizzaFacts[currentFactIndex].fact}</p>
            <span class="click-hint">click for another fact!</span>
        </div>
    </section>

    <section class="features">
        <h2>What We Offer</h2>
        <div class="feature-grid">
            <div class="feature">
                <span class="feature-icon">🧮</span>
                <h4>Pizza Calculator</h4>
                <p>Input your crowd, their hunger, and get the magic number</p>
            </div>
            <div class="feature">
                <span class="feature-icon">📊</span>
                <h4>Volume Science</h4>
                <p>Learn why bigger pizzas are almost always the better deal</p>
            </div>
            <div class="feature">
                <span class="feature-icon">🥬</span>
                <h4>Veggie Support</h4>
                <p>We account for your plant-based pals too</p>
            </div>
            <div class="feature">
                <span class="feature-icon">🎨</span>
                <h4>Janky Charm</h4>
                <p>Hand-crafted, artisanal website vibes (bugs are features)</p>
            </div>
        </div>
    </section>

    <section class="disclaimer">
        <h3>⚠️ Important Disclaimer</h3>
        <p>
            HMPDIN is not responsible for: over-ordering due to optimism, under-ordering due to
            underestimating your friend Chad's appetite, pizza-related arguments, or the inevitable
            "I told you we needed more" from your partner.
        </p>
        <p>
            Results are estimates. When in doubt, <strong>order one more</strong>. You're welcome.
        </p>
    </section>

    <div class="pizza-parade">
        {#each Array(7) as _, i}
            <span class="parade-pizza" style="animation-delay: {i * 0.3}s">
                {["🍕", "🍕", "🧀", "🍕", "🍅", "🍕", "🌿"][i]}
            </span>
        {/each}
    </div>
</div>

<style>
    .about-page {
        max-width: 700px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        font-size: 2.5rem;
    }

    .tagline-box {
        text-align: center;
        padding: 20px;
        margin: 20px 0 30px 0;
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        border-radius: 15px;
        border: 3px dashed #ffb74d;
    }

    .quote-mark {
        font-size: 3rem;
        color: #ff8a65;
        font-family: Georgia, serif;
        line-height: 1;
    }

    .tagline {
        display: block;
        font-family: 'Chewy', cursive;
        font-size: 1.8rem;
        color: #5d4037;
        padding: 10px 0;
    }

    section {
        margin-bottom: 40px;
    }

    .story {
        background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
        padding: 25px;
        border-radius: 15px;
        border-left: 5px solid #ff7043;
    }

    .story p {
        margin: 15px 0;
    }

    .mission {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    .mission-card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        border: 3px solid #e0e0e0;
        transition: all 0.3s ease;
    }

    .mission-card:hover {
        transform: translateY(-5px);
        border-color: #ffb74d;
        box-shadow: 0 10px 25px rgba(255, 183, 77, 0.2);
    }

    .mission-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 10px;
    }

    .mission-card h3 {
        font-family: 'Chewy', cursive;
        color: #e65100;
        margin: 10px 0;
    }

    .mission-card small {
        display: block;
        margin-top: 10px;
        color: #9e9e9e;
        font-size: 0.8rem;
    }

    .fun-fact {
        text-align: center;
    }

    .fact-card {
        background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%);
        padding: 30px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 3px solid #81c784;
    }

    .fact-card:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 30px rgba(129, 199, 132, 0.3);
    }

    .fact-card:active {
        transform: scale(0.98);
    }

    .fact-emoji {
        font-size: 4rem;
        display: block;
        margin-bottom: 15px;
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .fact-text {
        font-size: 1.3rem;
        color: #2e7d32;
        margin: 0;
    }

    .click-hint {
        display: block;
        margin-top: 15px;
        font-size: 0.9rem;
        color: #66bb6a;
        opacity: 0.8;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .feature {
        padding: 20px;
        background: white;
        border-radius: 15px;
        border: 2px solid #eeeeee;
        transition: all 0.2s ease;
    }

    .feature:hover {
        border-color: #ff7043;
        background: #fff8f5;
    }

    .feature-icon {
        font-size: 2.5rem;
    }

    .feature h4 {
        margin: 10px 0 5px 0;
    }

    .feature p {
        margin: 0;
        color: #757575;
        font-size: 0.95rem;
    }

    .disclaimer {
        background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
        padding: 25px;
        border-radius: 15px;
        border: 2px solid #ffc107;
    }

    .disclaimer h3 {
        margin-top: 0;
        color: #f57f17;
    }

    .disclaimer p {
        margin: 10px 0;
    }

    .pizza-parade {
        text-align: center;
        padding: 30px 0;
        font-size: 3rem;
    }

    .parade-pizza {
        display: inline-block;
        animation: wave 2s ease-in-out infinite;
    }

    @keyframes wave {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(-10deg); }
        75% { transform: translateY(-15px) rotate(10deg); }
    }

    @media (max-width: 600px) {
        .feature-grid {
            grid-template-columns: 1fr;
        }

        .tagline {
            font-size: 1.4rem;
        }
    }
</style>
