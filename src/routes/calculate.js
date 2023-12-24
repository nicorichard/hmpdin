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
 * @param {number} hungerLevel
 * @param {number} people
 * @param {number} diameter
 * @param {number} crustMultiplier
 */
function _calculate(hungerLevel, people, diameter, crustMultiplier) {
    const volumeMod = volumeMultiplier(diameter, crustMultiplier);
    const floatResult = (hungerLevel * people) / 8 * volumeMod;

    return Math.ceil(floatResult);
}

/**
 * @param {number} hungerLevel
 * @param {number} people
 * @param {number} diameter
 * @param {number} crustMultiplier
 * @param {number} vegetarians
 */
export default function calculate(hungerLevel, people, diameter, crustMultiplier, vegetarians) {

    if (vegetarians > 0) {
        return _calculate(hungerLevel, people - vegetarians, diameter, crustMultiplier) + _calculate(hungerLevel, vegetarians, diameter, crustMultiplier);
    } else {
        return _calculate(hungerLevel, people, diameter, crustMultiplier)
    }
}