import { DiceRoller } from '../utils/dice-roller.js';
import { AbilityScoresGenerator } from './ability-scores-generator.js';

export class DiceRollsAbilityScoresGenerator extends AbilityScoresGenerator {
    generateAbilityScores() {
        const abilityScores = this.generateEmptyAbilityScores();
        for (const abilityScore of Object.values(abilityScores)) {
            let rolls = [];
            for (let i = 0; i < 4; i++) rolls.push(DiceRoller.d6());
            rolls = rolls.sort((a, b) => a - b);
            const bestRolls = rolls.slice(-3);
            abilityScore.setScore(bestRolls.reduce((x, y) => x + y));
            abilityScore.setRolls(rolls);
        }
        return abilityScores;
    }
}
