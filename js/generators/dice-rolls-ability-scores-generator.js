import { DiceRoller } from '../utils/dice-roller.js';
import { AbilityScoresGenerator } from './ability-scores-generator.js';

export class DiceRollsAbilityScoresGenerator extends AbilityScoresGenerator {
    generateAbilityScores() {
        const abilityScores = this._generateEmptyAbilityScores();
        for (const abilityScore of Object.values(abilityScores)) {
            const rolls = [];
            for (let i = 0; i < 4; i++) rolls.push(DiceRoller.d6());
            const bestRolls = rolls.sort((a, b) => a - b).slice(-3);
            abilityScore.setScore(bestRolls.reduce((x, y) => x + y));
        }
        return abilityScores;
    }
}
