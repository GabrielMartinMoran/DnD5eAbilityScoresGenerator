import { AbilityScoresGenerator } from './ability-scores-generator.js';

export class StandardArrayAbilityScoresGenerator extends AbilityScoresGenerator {
    generateAbilityScores() {
        const abilityScores = this._generateEmptyAbilityScores();
        const standardScoresArray = [15, 14, 13, 12, 10, 8];
        for (const abilityScore of Object.values(abilityScores)) {
            const randomIndex = Math.floor(Math.random() * standardScoresArray.length);
            abilityScore.setScore(standardScoresArray[randomIndex]);
            standardScoresArray.splice(randomIndex, 1);
        }
        return abilityScores;
    }
}
