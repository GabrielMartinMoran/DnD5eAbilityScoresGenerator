export class AbilityScore {

    #MODIFIERS = {
        1: -5,
        2: -4,
        3: -4,
        4: -3,
        5: -3,
        6: -2,
        7: -2,
        8: -1,
        9: -1,
        10: 0,
        11: 0,
        12: 1,
        13: 1,
        14: 2,
        15: 2,
        16: 3,
        17: 3,
        18: 4,
        19: 4,
        20: 5,
    };

    #score = 10;
    #rolls = [];

    constructor(score) {
        this.#score = score;
    }

    getScore() {
        return this.#score;
    }

    setScore(score) {
        this.#score = score;
    }

    setRolls(rolls) {
        this.#rolls = rolls;
    }

    getRolls() {
        return this.#rolls;
    }

    getModifier() {
        const value = this.#MODIFIERS[this.getScore()];
        if (value <= 0) return value.toString();
        return `+${value}`;
    }
}