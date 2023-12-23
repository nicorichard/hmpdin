/**
 * @param {number} diameter
 */
function circleArea(diameter) {
    return Math.PI * Math.pow(diameter/2, 2);
}

const standardPizzaVolume = circleArea(14);

/**
 * @param {number} diameter
 * @param {boolean} thinCrust
 */
function volumeMultiplier(diameter, thinCrust) {
    const thinCrustMultiplier = thinCrust ? 1.4 : 1;
    return standardPizzaVolume / circleArea(diameter) * thinCrustMultiplier;
}

/**
 * @param {number} hungerLevel
 * @param {number} people
 * @param {number} diameter
 * @param {boolean} thinCrust
 */
export default function calculate(hungerLevel, people, diameter, thinCrust) {
    const volumeMod = volumeMultiplier(diameter, thinCrust);
    const floatResult = (hungerLevel * people) / 8 * volumeMod;

    return Math.ceil(floatResult);
}