import { DiceRoller } from '../utils/dice-roller.js';
import { AbilityScoresGenerator } from './ability-scores-generator.js';
import { CONFIG } from '../config.js';

export class BalancedRollsAbilityScoresGenerator extends AbilityScoresGenerator {
    generateAbilityScores(minTotalScore, maxTotalScore, groupingStrategy) {
        const abilityScores = this.generateEmptyAbilityScores();
        let combination = null;
        while (combination === null) {
            const abilityScoresRolls = {};
            for (const abilityScore of Object.keys(abilityScores)) {
                const rolls = [DiceRoller.d6(), DiceRoller.d6(), DiceRoller.d6(), DiceRoller.d6()].sort(
                    (a, b) => a - b
                );
                abilityScores[abilityScore].setRolls(rolls);
                abilityScoresRolls[abilityScore] = rolls;
            }
            combination = this.#getBestAbilityScoreCombination(
                abilityScoresRolls,
                minTotalScore,
                maxTotalScore,
                groupingStrategy
            );
        }
        let i = 0;
        for (const score of Object.values(abilityScores)) {
            score.setScore(combination[i]);
            i++;
        }
        return abilityScores;
    }

    #getBestAbilityScoreCombination(abilityScoresRolls, minTotalScore, maxTotalScore, groupingStrategy) {
        const combinations = [];
        const combinationsRef = [];
        for (const abilityScore of Object.keys(abilityScoresRolls)) {
            combinationsRef.push(abilityScore);
            const values = abilityScoresRolls[abilityScore];
            combinations.push([
                values[0] + values[1] + values[2],
                values[0] + values[1] + values[3],
                values[0] + values[2] + values[3],
                values[1] + values[2] + values[3],
            ]);
        }
        const combinationsToTry = [];
        const possibilitiesLength = 4;
        for (let s_i = 0; s_i < possibilitiesLength; s_i++)
            for (let d_i = 0; d_i < possibilitiesLength; d_i++)
                for (let c_i = 0; c_i < possibilitiesLength; c_i++)
                    for (let i_i = 0; i_i < possibilitiesLength; i_i++)
                        for (let w_i = 0; w_i < possibilitiesLength; w_i++)
                            for (let ch_i = 0; ch_i < possibilitiesLength; ch_i++)
                                combinationsToTry.push([s_i, d_i, c_i, i_i, w_i, ch_i]);

        const candidates = [];
        for (const combinationToTry of combinationsToTry) {
            const scores = [
                combinations[0][combinationToTry[0]],
                combinations[1][combinationToTry[1]],
                combinations[2][combinationToTry[2]],
                combinations[3][combinationToTry[3]],
                combinations[4][combinationToTry[4]],
                combinations[5][combinationToTry[5]],
            ];
            const sum = this.#sumScores(scores);
            if (sum >= minTotalScore && sum <= maxTotalScore) {
                candidates.push(scores);
            }
        }
        const sortedCandidates = this.#sortScores(candidates, groupingStrategy);
        if (sortedCandidates.length == 0) return null;
        /*
        console.table(
            sortedCandidates.map((x) => {
                return {
                    scores: x.toString(),
                    sum: this.#sumScores(x),
                    ponderated_sum: this.#ponderatedSumScores(x, groupingStrategy),
                };
            })
        );
        */
        return sortedCandidates[sortedCandidates.length - 1];
    }

    #sumScores(scores) {
        return scores.reduce((a, b) => a + b, 0);
    }

    #ponderatedSumScores(scores, groupingStrategy) {
        let reducer = (a, b) => a + b;
        if (groupingStrategy === CONFIG.BALANCED_ROLL_GROUPING_STRAT.PEAKS) {
            reducer = (a, b) => a + Math.pow(b, 4);
        } else if (groupingStrategy === CONFIG.BALANCED_ROLL_GROUPING_STRAT.FLATTERN) {
            reducer = (a, b) => a - Math.pow(Math.abs(10 - b), 2);
        } else if (groupingStrategy === CONFIG.BALANCED_ROLL_GROUPING_STRAT.RANDOM) {
            reducer = (a, b) => Math.random();
        }
        return scores.reduce(reducer, 0);
    }

    #sortScores(scores, groupingStrategy) {
        return scores.sort(
            (a, b) => this.#ponderatedSumScores(a, groupingStrategy) - this.#ponderatedSumScores(b, groupingStrategy)
        );
    }
}
