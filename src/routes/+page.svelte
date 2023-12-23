<script>
	import calculate from './calculate.js';

	let result = 0;
    let people = 1;

    let crust = "regular";

    let hungerLevels = [
        {
            title: "snack",
            value: 2.5,
        },
        {
            title: "regular",
            value: 3.5,
        },
        {
            title: "feast",
            value: 6,
        }
    ];
    let hunger = hungerLevels[1];

	function handleSubmit() {
        result = calculate(hunger.value, people, 14, crust === "thin");
	}

    function onChange() {
        result = 0;
    }
</script>

<h1>How many pizzas do I need?</h1>


<form on:submit|preventDefault={handleSubmit}>
    <select
        bind:value={hunger}
		on:change={onChange}
    >
        {#each hungerLevels as level}
            <option value={level}>{level.title}</option>
        {/each}
    </select>

    <select
        bind:value={crust}
		on:change={onChange}
    >
        <option value="thin">thin</option>
        <option value="regular">regular</option>
    </select>

    <label>
        <input
            bind:value={people}
            on:change={onChange}
            type="number" 
            min="1"
        />
    </label>

    <button type="submit">Calculate</button>

    {#if result > 0}
        <p>You need {result} pizzas.</p>
    {/if}
</form>