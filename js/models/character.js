export class Character {
    #name;
    #abilityScores;

    constructor(name, abilityScores) {
        /**
         * @param name: Name of the character
         * @param name: Map of ability scores
         */
        this.#name = name;
        this.#abilityScores = abilityScores;
    }

    getName() {
        return this.#name;
    }

    getAbilityScores() {
        return this.#abilityScores;
    }
}
