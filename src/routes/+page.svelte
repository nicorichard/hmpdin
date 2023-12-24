<script>
	import calculate from './calculate.js';

	let result = 0;

    let size = 14;
    let people = 1;
    let vegetarians = 0;

    let crustOptions = [
        {
            title: "thin",
            multiplier: 1.4,
        },
        {
            title: "regular",
            multiplier: 1,
        }
    ];
    let crust = crustOptions[1];

    let hungerOptions = [
        {
            title: "snack",
            value: 2.5,
        },
        {
            title: "meal",
            value: 3.5,
        },
        {
            title: "feast",
            value: 6,
        }
    ];
    let hunger = hungerOptions[1];

	function handleSubmit() {
        result = calculate(hunger.value, people, size, crust.multiplier, vegetarians);
	}

    function onChange() {
        result = 0;

        if (vegetarians > people) {
            vegetarians = people;
        }
    }
</script>

<h1>How many pizzas do I need?</h1>

<form on:submit|preventDefault={handleSubmit}>
    <h4>hunger</h4>
    {#each hungerOptions as level}
        <div>
            <label>
                <input
                    type="radio"
                    bind:group={hunger}
                    value={level}
                    on:change={onChange}
                />
                {level.title}
            </label>
        </div>
    {/each}

    <h4>crust</h4>
    {#each crustOptions as option}
    <div>
        <label>
            <input
                type="radio"
                bind:group={crust}
                value={option}
                on:change={onChange}
            />
            {option.title}
        </label>
    </div>
    {/each}

    <h4>size (inches)</h4>
    <input
        bind:value={size}
        on:change={onChange}
        type="number"
        min="1"
    />

    <h4>people eating</h4>
    <input
        bind:value={people}
        on:change={onChange}
        type="number" 
        min="1"
    />

    <h4>vegetarians</h4>
    <input
        bind:value={vegetarians}
        on:change={onChange}
        type="number" 
        min="0"
        max={people}
    />

    <br />
    <br />
    <br />
    <br />

    <button type="submit">Calculate</button>

    {#if result > 0}
        <p>You need {result} pizza{result > 1 ? "s" : ""}</p>
    {/if}
</form>