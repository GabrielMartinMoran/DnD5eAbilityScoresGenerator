import { DiceRoller } from '../utils/dice-roller.js';
import { AbilityScoresGenerator } from './ability-scores-generator.js';

export class OldSchoolRollsAbilityScoresGenerator extends AbilityScoresGenerator {
    generateAbilityScores() {
        const abilityScores = this.generateEmptyAbilityScores();
        for (const abilityScore of Object.values(abilityScores)) {
            let rolls = [];
            for (let i = 0; i < 3; i++) rolls.push(DiceRoller.d6());
            abilityScore.setScore(rolls.reduce((x, y) => x + y));
            abilityScore.setRolls(rolls.sort((a, b) => a - b));
        }
        return abilityScores;
    }
}
