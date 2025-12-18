<script lang="js">
    import { base } from '$app/paths';

    let spinning = false;

    function spinPizza() {
        spinning = true;
        setTimeout(() => spinning = false, 1000);
    }
</script>

<div class="pizzeria">
    <header>
        <div class="logo" on:click={spinPizza} on:keypress={spinPizza} role="button" tabindex="0">
            <span class="pizza-spin" class:spinning>🍕</span>
            <h1 class="site-title">HMPDIN</h1>
            <span class="subtitle">~ How Many Pizzas Do I Need? ~</span>
        </div>
        <nav>
            <a href="{base}/" class="nav-link">
                <span class="topping">🧮</span> Calculator
            </a>
            <a href="{base}/volume" class="nav-link">
                <span class="topping">📏</span> Pizza Math
            </a>
            <a href="{base}/about" class="nav-link">
                <span class="topping">🍅</span> About
            </a>
        </nav>
    </header>

    <main>
        <slot />
    </main>

    <footer>
        <div class="footer-pizza">
            🍕 Made with cheese and love 🍕
        </div>
        <div class="ingredients">
            <span class="bounce" style="animation-delay: 0s">🫒</span>
            <span class="bounce" style="animation-delay: 0.1s">🍄</span>
            <span class="bounce" style="animation-delay: 0.2s">🌶️</span>
            <span class="bounce" style="animation-delay: 0.3s">🧀</span>
            <span class="bounce" style="animation-delay: 0.4s">🍅</span>
            <span class="bounce" style="animation-delay: 0.5s">🌿</span>
        </div>
    </footer>
</div>

<style>
    :global(*) {
        box-sizing: border-box;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Patrick Hand', cursive;
        font-size: 18px;
        background:
            repeating-linear-gradient(
                45deg,
                #fff8f0 0px,
                #fff8f0 20px,
                #ffe4cc 20px,
                #ffe4cc 40px
            );
        background-attachment: fixed;
        min-height: 100vh;
        color: #4a2c2a;
    }

    .pizzeria {
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
    }

    header {
        text-align: center;
        padding: 20px;
        background: linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%);
        border-radius: 20px;
        border: 5px solid #8b4513;
        box-shadow:
            0 8px 0 #5d2f0d,
            0 12px 20px rgba(0,0,0,0.3),
            inset 0 2px 10px rgba(255,255,255,0.2);
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
    }

    header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='4' fill='%23ff6b6b' opacity='0.3'/%3E%3C/svg%3E");
        pointer-events: none;
    }

    .logo {
        cursor: pointer;
        position: relative;
        z-index: 1;
    }

    .pizza-spin {
        font-size: 4rem;
        display: inline-block;
        filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.4));
        transition: transform 0.3s ease;
    }

    .pizza-spin:hover {
        transform: scale(1.1);
    }

    .pizza-spin.spinning {
        animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(540deg) scale(1.3); }
        100% { transform: rotate(720deg) scale(1); }
    }

    .site-title {
        font-family: 'Chewy', cursive;
        font-size: 3.5rem;
        color: #ffeb3b;
        text-shadow:
            3px 3px 0 #ff6f00,
            6px 6px 0 #e65100,
            -1px -1px 0 #fff;
        margin: 10px 0 5px 0;
        letter-spacing: 4px;
    }

    .subtitle {
        color: #fff;
        font-size: 1.1rem;
        opacity: 0.9;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    nav {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
    }

    .nav-link {
        background: linear-gradient(180deg, #ffd54f 0%, #ffb300 100%);
        color: #5d4037;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 25px;
        border: 3px solid #8d6e63;
        font-weight: bold;
        font-size: 1.1rem;
        transition: all 0.2s ease;
        box-shadow: 0 4px 0 #6d4c41;
    }

    .nav-link:hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 0 #6d4c41;
        background: linear-gradient(180deg, #ffe082 0%, #ffc107 100%);
    }

    .nav-link:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #6d4c41;
    }

    .topping {
        margin-right: 5px;
    }

    main {
        background: #fffaf5;
        border-radius: 20px;
        padding: 30px;
        border: 4px dashed #d7ccc8;
        box-shadow:
            0 4px 15px rgba(0,0,0,0.1),
            inset 0 0 50px rgba(255,200,150,0.2);
        position: relative;
    }

    main::before {
        content: '🍕';
        position: absolute;
        top: -15px;
        left: 20px;
        font-size: 1.5rem;
        background: #fffaf5;
        padding: 0 10px;
    }

    main::after {
        content: '🍕';
        position: absolute;
        top: -15px;
        right: 20px;
        font-size: 1.5rem;
        background: #fffaf5;
        padding: 0 10px;
        transform: scaleX(-1);
    }

    footer {
        text-align: center;
        padding: 30px 20px;
        margin-top: 30px;
    }

    .footer-pizza {
        font-size: 1.2rem;
        color: #8d6e63;
        margin-bottom: 15px;
    }

    .ingredients {
        font-size: 2rem;
    }

    .bounce {
        display: inline-block;
        animation: bounce 2s infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    :global(h1) {
        font-family: 'Chewy', cursive;
        color: #d32f2f;
        text-shadow: 2px 2px 0 #ffcc80;
    }

    :global(h2) {
        font-family: 'Chewy', cursive;
        color: #e65100;
        position: relative;
        display: inline-block;
    }

    :global(h2)::after {
        content: '🧀';
        position: absolute;
        right: -35px;
        top: 0;
    }

    :global(h3) {
        font-family: 'Chewy', cursive;
        color: #388e3c;
    }

    :global(h4) {
        font-family: 'Chewy', cursive;
        color: #5d4037;
        font-size: 1.3rem;
        margin: 15px 0 8px 0;
    }

    :global(button) {
        font-family: 'Chewy', cursive;
        font-size: 1.5rem;
        padding: 15px 40px;
        background: linear-gradient(180deg, #4caf50 0%, #2e7d32 100%);
        color: white;
        border: 4px solid #1b5e20;
        border-radius: 50px;
        cursor: pointer;
        box-shadow:
            0 6px 0 #1b5e20,
            0 10px 20px rgba(0,0,0,0.2);
        transition: all 0.15s ease;
        text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
    }

    :global(button:hover) {
        transform: translateY(-3px);
        box-shadow:
            0 9px 0 #1b5e20,
            0 15px 25px rgba(0,0,0,0.25);
        background: linear-gradient(180deg, #66bb6a 0%, #43a047 100%);
    }

    :global(button:active) {
        transform: translateY(3px);
        box-shadow:
            0 3px 0 #1b5e20,
            0 5px 10px rgba(0,0,0,0.2);
    }

    :global(input[type="number"]) {
        font-family: 'Patrick Hand', cursive;
        font-size: 1.2rem;
        padding: 10px 15px;
        border: 3px solid #d7ccc8;
        border-radius: 15px;
        background: #fff;
        width: 100px;
        text-align: center;
        transition: all 0.2s ease;
    }

    :global(input[type="number"]:focus) {
        outline: none;
        border-color: #ff7043;
        box-shadow: 0 0 10px rgba(255, 112, 67, 0.3);
    }

    :global(input[type="range"]) {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        background: linear-gradient(to right, #ffcc80, #ff8a65, #d32f2f);
        border-radius: 10px;
        outline: none;
        cursor: pointer;
    }

    :global(input[type="range"]::-webkit-slider-thumb) {
        -webkit-appearance: none;
        appearance: none;
        width: 35px;
        height: 35px;
        background: #ffeb3b;
        border: 4px solid #ff6f00;
        border-radius: 50%;
        cursor: grab;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    }

    :global(input[type="range"]::-webkit-slider-thumb:active) {
        cursor: grabbing;
        transform: scale(1.1);
    }

    :global(label) {
        cursor: pointer;
        transition: all 0.2s ease;
    }

    :global(label:hover) {
        color: #d32f2f;
    }

    :global(p) {
        line-height: 1.6;
    }

    :global(b), :global(strong) {
        color: #d32f2f;
    }

    :global(i) {
        color: #5d4037;
    }
</style>
