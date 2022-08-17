'use strict';

import { AbilityScoresGenerator } from './generators/ability-scores-generator.js';
import { BalancedRollsAbilityScoresGenerator } from './generators/balanced-rolls-ability-scores-generator.js';
import { DiceRollsAbilityScoresGenerator } from './generators/dice-rolls-ability-scores-generator.js';
import { OldSchoolRollsAbilityScoresGenerator } from './generators/old-school-rolls-ability-scores-generator.js';
import { StandardArrayAbilityScoresGenerator } from './generators/standard-array-ability-scores-generator.js';
import { AbilityScoresRenderer } from './renderers/ability-scores-renderer.js';

const standardArrayAbilityScoresGenerator = new StandardArrayAbilityScoresGenerator();
const oldSchoolRollsAbilityScoresGenerator = new OldSchoolRollsAbilityScoresGenerator();
const diceRollsAbilityScoresGenerator = new DiceRollsAbilityScoresGenerator();
const balancedRollsAbilityScoresGenerator = new BalancedRollsAbilityScoresGenerator();

const generateStandardArray = () => {
    AbilityScoresRenderer.render('standardArrayaResults', standardArrayAbilityScoresGenerator.generateAbilityScores());
};

const generateOldSchoolDiceRolls = () => {
    AbilityScoresRenderer.render('oldSchoolRollsResults', oldSchoolRollsAbilityScoresGenerator.generateAbilityScores());
};

const generateDiceRolls = () => {
    AbilityScoresRenderer.render('diceRollsResults', diceRollsAbilityScoresGenerator.generateAbilityScores());
};

const generateBalancedRolls = () => {
    const min = parseInt(document.getElementById('generateBalancedRollsMinBoundInput').value);
    const max = parseInt(document.getElementById('generateBalancedRollsMaxBoundInput').value);
    if (min > max) {
        alert('Min possible score must not be greter than max possible score');
        return;
    }
    const minPossibleTotalScore = 3 * 6; // Min score * amount of stats
    const maxPossibleTotalScore = (3 * 6) * 6; // Max score * amount of stats
    if (min < minPossibleTotalScore) {
        alert(`Min possible score must not be lower than ${minPossibleTotalScore}`);
        return;
    }
    if (max > maxPossibleTotalScore) {
        alert(`Max possible score must not be greater than ${maxPossibleTotalScore}`);
        return;
    }
    AbilityScoresRenderer.render(
        'balancedRollsResults',
        balancedRollsAbilityScoresGenerator.generateAbilityScores(min, max)
    );
};

const renderSkeletons = () => {
    const resultIds = ['standardArrayaResults', 'oldSchoolRollsResults', 'diceRollsResults', 'balancedRollsResults'];
    const emptyAbilityScores = new AbilityScoresGenerator().generateEmptyAbilityScores();
    for (const resultId of resultIds) {
        AbilityScoresRenderer.renderSkeleton(resultId, emptyAbilityScores);
    }
};

// Register buttons click listeners
document.getElementById('generateStandardArrayBtn').addEventListener('click', generateStandardArray);
document.getElementById('generateOldSchoolRollsBtn').addEventListener('click', generateOldSchoolDiceRolls);
document.getElementById('generateDiceRollsBtn').addEventListener('click', generateDiceRolls);
document.getElementById('generateBalancedRollsBtn').addEventListener('click', generateBalancedRolls);

// Call the generators for having data when page loads
renderSkeletons();
