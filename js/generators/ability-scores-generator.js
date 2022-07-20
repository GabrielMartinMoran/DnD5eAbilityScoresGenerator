import { AbilityScore } from "../models/ability-score.js";

export class AbilityScoresGenerator {

    _generateEmptyAbilityScores() {
        return {
            strength: new AbilityScore(0),
            dexterity: new AbilityScore(0),
            constitution: new AbilityScore(0),
            intelligence: new AbilityScore(0),
            wisdom: new AbilityScore(0),
            charisma: new AbilityScore(0)
        }
    }

    generateAbilityScores() {
        throw Error('Not implenented');
    }
}