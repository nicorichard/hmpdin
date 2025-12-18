/**
 * @param {number} diameter
 */
function circleArea(diameter) {
    return Math.PI * Math.pow(diameter/2, 2);
}

const standardPizzaVolume = circleArea(14);
const SLICES_PER_PIZZA = 8;

/**
 * @param {number} diameter
 * @param {number} crustMultiplier
 */
function volumeMultiplier(diameter, crustMultiplier) {
    return standardPizzaVolume / circleArea(diameter) * crustMultiplier;
}

/**
 * @typedef {Object} DietaryGroups
 * @property {number} meatLovers
 * @property {number} flexible
 * @property {number} vegetarian
 * @property {number} halal
 * @property {number} glutenFree
 */

/**
 * @typedef {Object} PizzaBreakdown
 * @property {number} meat
 * @property {number} veggie
 * @property {number} glutenFree
 * @property {number} total
 */

/**
 * @param {number} hungerLevel
 * @param {DietaryGroups} groups
 * @param {number} diameter
 * @param {number} crustMultiplier
 * @returns {PizzaBreakdown}
 */
export function calculateWithRestrictions(hungerLevel, groups, diameter, crustMultiplier) {
    const volumeMod = volumeMultiplier(diameter, crustMultiplier);
    const slicesPerPizza = SLICES_PER_PIZZA / volumeMod;

    // GF people need their own pizzas
    const gfSlices = hungerLevel * groups.glutenFree;
    const gfPizzas = Math.ceil(gfSlices / slicesPerPizza) || 0;

    // Meat lovers need meat pizzas
    const meatSlices = hungerLevel * groups.meatLovers;

    // Vegetarians + Halal share veggie pizzas
    const veggieSlices = hungerLevel * (groups.vegetarian + groups.halal);

    // Flexible people fill gaps
    const flexSlices = hungerLevel * groups.flexible;

    let meatPizzas = 0;
    let veggiePizzas = 0;

    if (meatSlices > 0) {
        meatPizzas = Math.ceil(meatSlices / slicesPerPizza);
    }

    if (veggieSlices > 0) {
        veggiePizzas = Math.ceil(veggieSlices / slicesPerPizza);
    }

    // Distribute flexible people
    let remainingFlex = flexSlices;

    // Fill meat pizza gaps first
    if (meatPizzas > 0) {
        const meatCapacity = meatPizzas * slicesPerPizza - meatSlices;
        const fillMeat = Math.min(meatCapacity, remainingFlex);
        remainingFlex -= fillMeat;
    }

    // Fill veggie pizza gaps
    if (veggiePizzas > 0) {
        const veggieCapacity = veggiePizzas * slicesPerPizza - veggieSlices;
        const fillVeggie = Math.min(veggieCapacity, remainingFlex);
        remainingFlex -= fillVeggie;
    }

    // Remaining flexible get their own pizzas
    if (remainingFlex > 0) {
        if (groups.meatLovers > 0 && groups.vegetarian === 0 && groups.halal === 0) {
            meatPizzas += Math.ceil(remainingFlex / slicesPerPizza);
        } else if (groups.meatLovers === 0) {
            veggiePizzas += Math.ceil(remainingFlex / slicesPerPizza);
        } else {
            // Mixed group - veggie works for everyone
            veggiePizzas += Math.ceil(remainingFlex / slicesPerPizza);
        }
    }

    return {
        meat: meatPizzas,
        veggie: veggiePizzas,
        glutenFree: gfPizzas,
        total: meatPizzas + veggiePizzas + gfPizzas
    };
}

/**
 * Legacy function
 */
export default function calculate(hungerLevel, people, diameter, crustMultiplier, vegetarians) {
    const result = calculateWithRestrictions(
        hungerLevel,
        { meatLovers: 0, flexible: people - vegetarians, vegetarian: vegetarians, halal: 0, glutenFree: 0 },
        diameter,
        crustMultiplier
    );
    return result.total;
}
