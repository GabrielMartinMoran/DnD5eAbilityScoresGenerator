'use strict';

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
    AbilityScoresRenderer.render('balancedRollsResults', balancedRollsAbilityScoresGenerator.generateAbilityScores());
};

// Register buttons click listeners
document.getElementById('generateStandardArrayBtn').addEventListener('click', generateStandardArray);
document.getElementById('generateOldSchoolRollsBtn').addEventListener('click', generateOldSchoolDiceRolls);
document.getElementById('generateDiceRollsBtn').addEventListener('click', generateDiceRolls);
document.getElementById('generateBalancedRollsBtn').addEventListener('click', generateBalancedRolls);

// Call the generators for having data when page loads
generateStandardArray();
generateOldSchoolDiceRolls();
generateDiceRolls();
generateBalancedRolls();
