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
    <label>
        hunger
        <select
            bind:value={hunger}
            on:change={onChange}
        >
            {#each hungerOptions as level}
                <option value={level}>{level.title}</option>
            {/each}
        </select>
    </label>

    <label>
        crust
        <select
            bind:value={crust}
            on:change={onChange}
        >
            {#each crustOptions as option}
                <option value={option}>{option.title}</option>
            {/each}
        </select>
    </label>

    <label>
        size
        <input
            bind:value={size}
            on:change={onChange}
            type="number"
            min="1"
        />
    </label>

    <label>
        people
        <input
            bind:value={people}
            on:change={onChange}
            type="number" 
            min="1"
        />
    </label>

    <label>
        vegetarians
        <input
            bind:value={vegetarians}
            on:change={onChange}
            type="number" 
            min="0"
            max={people}
        />
    </label>

    <button type="submit">Calculate</button>

    {#if result > 0}
        <p>You need {result} pizzas.</p>
    {/if}
</form>