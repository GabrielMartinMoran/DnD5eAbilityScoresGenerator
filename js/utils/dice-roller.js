export class DiceRoller {

    static #d(faces) {
        return Math.floor(Math.random() * (faces) + 1)
    }

    static d6() {
        return this.#d(6);
    }
}