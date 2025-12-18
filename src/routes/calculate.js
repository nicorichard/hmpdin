/**
 * @param {number} diameter
 */
function circleArea(diameter) {
    return Math.PI * Math.pow(diameter/2, 2);
}

const standardPizzaVolume = circleArea(14);

/**
 * @param {number} diameter
 * @param {number} crustMultiplier
 */
function volumeMultiplier(diameter, crustMultiplier) {
    return standardPizzaVolume / circleArea(diameter) * crustMultiplier;
}

/**
 * Calculate slices needed for a group
 * @param {number} hungerLevel - slices per person
 * @param {number} people - number of people
 */
function slicesNeeded(hungerLevel, people) {
    return hungerLevel * people;
}

/**
 * @typedef {Object} DietaryGroups
 * @property {number} meatLovers - people who want meat
 * @property {number} flexible - people who eat anything
 * @property {number} vegetarian - no meat
 * @property {number} halal - will eat veggie (safest option)
 * @property {number} glutenFree - need separate GF pizzas
 */

/**
 * @typedef {Object} PizzaBreakdown
 * @property {number} meat - meat pizzas needed
 * @property {number} veggie - veggie pizzas needed
 * @property {number} glutenFree - GF pizzas needed
 * @property {number} total - total pizzas
 * @property {string} complexity - 'simple' | 'moderate' | 'complex' | 'chaotic'
 * @property {string[]} notes - helpful notes about the order
 * @property {Object} details - detailed breakdown info
 */

const SLICES_PER_PIZZA = 8;

/**
 * Calculate pizzas with dietary restrictions
 * @param {number} hungerLevel - slices per person
 * @param {DietaryGroups} groups - dietary group counts
 * @param {number} diameter - pizza diameter in inches
 * @param {number} crustMultiplier - crust type multiplier
 * @returns {PizzaBreakdown}
 */
export function calculateWithRestrictions(hungerLevel, groups, diameter, crustMultiplier) {
    const volumeMod = volumeMultiplier(diameter, crustMultiplier);
    const effectiveSlicesPerPizza = SLICES_PER_PIZZA / volumeMod;

    const notes = [];

    // GF people are completely separate - they need their own pizzas
    const gfSlicesNeeded = slicesNeeded(hungerLevel, groups.glutenFree);
    const gfPizzas = Math.ceil(gfSlicesNeeded / effectiveSlicesPerPizza);

    if (groups.glutenFree > 0) {
        notes.push(`🌾 GF crew gets ${gfPizzas} dedicated pizza${gfPizzas > 1 ? 's' : ''} (no sharing the gluten!)`);
    }

    // Meat lovers need meat pizzas
    const meatSlicesNeeded = slicesNeeded(hungerLevel, groups.meatLovers);

    // Vegetarians + Halal share veggie pizzas (halal's safest bet)
    const veggieSlicesNeeded = slicesNeeded(hungerLevel, groups.vegetarian + groups.halal);

    // Flexible people fill gaps
    const flexibleSlicesNeeded = slicesNeeded(hungerLevel, groups.flexible);

    // Calculate base pizzas for meat and veggie groups
    let meatPizzas = 0;
    let veggiePizzas = 0;
    let meatLeftover = 0;
    let veggieLeftover = 0;

    if (meatSlicesNeeded > 0) {
        meatPizzas = Math.ceil(meatSlicesNeeded / effectiveSlicesPerPizza);
        meatLeftover = (meatPizzas * effectiveSlicesPerPizza) - meatSlicesNeeded;
    }

    if (veggieSlicesNeeded > 0) {
        veggiePizzas = Math.ceil(veggieSlicesNeeded / effectiveSlicesPerPizza);
        veggieLeftover = (veggiePizzas * effectiveSlicesPerPizza) - veggieSlicesNeeded;
    }

    // Distribute flexible people to fill gaps first
    let remainingFlexSlices = flexibleSlicesNeeded;

    // Fill meat pizza gaps
    if (meatLeftover > 0 && remainingFlexSlices > 0) {
        const fillMeat = Math.min(meatLeftover, remainingFlexSlices);
        remainingFlexSlices -= fillMeat;
        meatLeftover -= fillMeat;
    }

    // Fill veggie pizza gaps
    if (veggieLeftover > 0 && remainingFlexSlices > 0) {
        const fillVeggie = Math.min(veggieLeftover, remainingFlexSlices);
        remainingFlexSlices -= fillVeggie;
        veggieLeftover -= fillVeggie;
    }

    // Remaining flexible people need their own pizzas (can be either type)
    // We'll add them as "dealer's choice" - split between meat and veggie
    if (remainingFlexSlices > 0) {
        // If there are meat eaters, add to meat. If only veggies, add to veggie. Otherwise split.
        if (groups.meatLovers > 0 && (groups.vegetarian + groups.halal) === 0) {
            meatPizzas += Math.ceil(remainingFlexSlices / effectiveSlicesPerPizza);
        } else if (groups.meatLovers === 0 && (groups.vegetarian + groups.halal) > 0) {
            veggiePizzas += Math.ceil(remainingFlexSlices / effectiveSlicesPerPizza);
        } else if (groups.meatLovers === 0 && (groups.vegetarian + groups.halal) === 0) {
            // All flexible - just get whatever (we'll call it meat for fun)
            meatPizzas += Math.ceil(remainingFlexSlices / effectiveSlicesPerPizza);
        } else {
            // Mixed group - add to veggie since everyone can eat it
            veggiePizzas += Math.ceil(remainingFlexSlices / effectiveSlicesPerPizza);
        }
    }

    // Generate notes
    if (groups.meatLovers > 0 && meatPizzas > 0) {
        notes.push(`🥩 ${meatPizzas} meat pizza${meatPizzas > 1 ? 's' : ''} for the carnivores`);
    }

    if ((groups.vegetarian + groups.halal) > 0 && veggiePizzas > 0) {
        const veggieGroup = [];
        if (groups.vegetarian > 0) veggieGroup.push('vegetarians');
        if (groups.halal > 0) veggieGroup.push('halal crew');
        notes.push(`🥬 ${veggiePizzas} veggie pizza${veggiePizzas > 1 ? 's' : ''} for ${veggieGroup.join(' + ')}`);
    } else if (veggiePizzas > 0) {
        notes.push(`🥬 ${veggiePizzas} veggie pizza${veggiePizzas > 1 ? 's' : ''}`);
    }

    if (groups.flexible > 0) {
        notes.push(`🤷 Your ${groups.flexible} flexible friend${groups.flexible > 1 ? 's' : ''} will fill in the gaps`);
    }

    if (groups.halal > 0) {
        notes.push(`☪️ Halal folks: veggie is the safe bet unless your pizza place has halal meat options!`);
    }

    // Determine complexity
    const totalPeople = groups.meatLovers + groups.flexible + groups.vegetarian + groups.halal + groups.glutenFree;
    const restrictionTypes = [
        groups.meatLovers > 0,
        groups.vegetarian > 0,
        groups.halal > 0,
        groups.glutenFree > 0
    ].filter(Boolean).length;

    let complexity;
    if (restrictionTypes === 0 || (groups.flexible === totalPeople)) {
        complexity = 'simple';
    } else if (restrictionTypes === 1) {
        complexity = 'moderate';
    } else if (restrictionTypes === 2) {
        complexity = 'complex';
    } else {
        complexity = 'chaotic';
    }

    const total = meatPizzas + veggiePizzas + gfPizzas;

    return {
        meat: meatPizzas,
        veggie: veggiePizzas,
        glutenFree: gfPizzas,
        total,
        complexity,
        notes,
        details: {
            meatLovers: groups.meatLovers,
            flexible: groups.flexible,
            vegetarian: groups.vegetarian,
            halal: groups.halal,
            glutenFree: groups.glutenFree,
            totalPeople
        }
    };
}

/**
 * Legacy function for backwards compatibility
 * @param {number} hungerLevel
 * @param {number} people
 * @param {number} diameter
 * @param {number} crustMultiplier
 * @param {number} vegetarians
 */
export default function calculate(hungerLevel, people, diameter, crustMultiplier, vegetarians) {
    const result = calculateWithRestrictions(
        hungerLevel,
        {
            meatLovers: 0,
            flexible: people - vegetarians,
            vegetarian: vegetarians,
            halal: 0,
            glutenFree: 0
        },
        diameter,
        crustMultiplier
    );
    return result.total;
}
