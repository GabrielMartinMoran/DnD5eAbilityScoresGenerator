'use strict';

import { CONFIG } from './config.js';
import { AbilityScoresGenerator } from './generators/ability-scores-generator.js';
import { BalancedRollsAbilityScoresGenerator } from './generators/balanced-rolls-ability-scores-generator.js';
import { DiceRollsAbilityScoresGenerator } from './generators/dice-rolls-ability-scores-generator.js';
import { OldSchoolRollsAbilityScoresGenerator } from './generators/old-school-rolls-ability-scores-generator.js';
import { StandardArrayAbilityScoresGenerator } from './generators/standard-array-ability-scores-generator.js';
import { AbilityScoresRenderer } from './renderers/ability-scores-renderer.js';
import { locateStr } from './utils/lang-string-provider.js';
import { URLParamsProvider } from './utils/url-params-provider.js';

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
    const min = parseInt($('#generateBalancedRollsMinBoundInput').value);
    const max = parseInt($('#generateBalancedRollsMaxBoundInput').value);
    if (min > max) {
        alert('Min possible score must not be greter than max possible score');
        return;
    }
    const minPossibleTotalScore = 3 * 6; // Min score * amount of stats
    const maxPossibleTotalScore = 3 * 6 * 6; // Max score * amount of stats
    if (min < minPossibleTotalScore) {
        alert(`Min possible score must not be lower than ${minPossibleTotalScore}`);
        return;
    }
    if (max > maxPossibleTotalScore) {
        alert(`Max possible score must not be greater than ${maxPossibleTotalScore}`);
        return;
    }
    const strategy = $('#generateBalancedRollsGroupingStrategy').value;
    AbilityScoresRenderer.render(
        'balancedRollsResults',
        balancedRollsAbilityScoresGenerator.generateAbilityScores(min, max, strategy)
    );
};

const renderSkeletons = () => {
    const resultIds = ['standardArrayaResults', 'oldSchoolRollsResults', 'diceRollsResults', 'balancedRollsResults'];
    const emptyAbilityScores = new AbilityScoresGenerator().generateEmptyAbilityScores();
    for (const resultId of resultIds) {
        AbilityScoresRenderer.renderSkeleton(resultId, emptyAbilityScores);
    }
};

const generateLangURL = (lang) => {
    return `${window.location.origin}${window.location.pathname}?lang=${lang}`;
};

const main = () => {
    if (!URLParamsProvider.hasSpecifiedLanguage()) {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', CONFIG.DEFAULT_LANG);
        window.location.replace(url);
    }

    $('#app').innerHTML = html`
        <h1 id="title">${locateStr('title')}</h1>
        <div>
            ${URLParamsProvider.getLanguage() === 'ES'
                ? 'Español'
                : html`<a href="${generateLangURL('ES')}">Español</a>`}
            |
            ${URLParamsProvider.getLanguage() === 'EN'
                ? 'English'
                : html`<a href="${generateLangURL('EN')}">English</a>`}
        </div>
        <div>
            <h3 id="standardArray">${locateStr('standardArray')}</h3>
            <button id="generateStandardArrayBtn">${locateStr('generateStandardArrayBtn')}</button>
            <div id="standardArrayaResults"></div>
        </div>
        <div>
            <h3 id="oldSchool">${locateStr('oldSchool')}</h3>
            <button id="generateOldSchoolRollsBtn">${locateStr('generateOldSchoolRollsBtn')}</button>
            <div id="oldSchoolRollsResults"></div>
        </div>
        <div>
            <h3 id="diceRolls">${locateStr('diceRolls')}</h3>
            <button id="generateDiceRollsBtn">${locateStr('generateDiceRollsBtn')}</button>
            <div id="diceRollsResults"></div>
        </div>
        <div>
            <h3 id="balancedDiceRolls">${locateStr('balancedDiceRolls')}</h3>
            <div class="balancedResultsOptions">
                <label id="minTotalScore">
                    ${locateStr('minTotalScore')}
                    <input class="boundInput" type="number" id="generateBalancedRollsMinBoundInput" value="72" />
                </label>
                <label id="maxTotalScore">
                    ${locateStr('maxTotalScore')}
                    <input class="boundInput" type="number" id="generateBalancedRollsMaxBoundInput" value="72" />
                </label>
                <label>
                    ${locateStr('diceGroupingStrategy')}
                    <select id="generateBalancedRollsGroupingStrategy">
                        <option selected value="${CONFIG.BALANCED_ROLL_GROUPING_STRAT.DEFAULT}">
                            ${locateStr('balancedRollDefaultStrategy')}
                        </option>
                        <option value="${CONFIG.BALANCED_ROLL_GROUPING_STRAT.PEAKS}">
                            ${locateStr('balancedRollPeaksStrategy')}
                        </option>
                        <option value="${CONFIG.BALANCED_ROLL_GROUPING_STRAT.FLATTERN}">
                            ${locateStr('balancedRollFlatternStrategy')}
                        </option>
                        <option value="${CONFIG.BALANCED_ROLL_GROUPING_STRAT.RANDOM}">
                            ${locateStr('balancedRollRandomStrategy')}
                        </option>
                    </select>
                </label>
                <button id="generateBalancedRollsBtn">${locateStr('generateBalancedRollsBtn')}</button>
            </div>
            <div id="balancedRollsResults"></div>
        </div>
    `;

    setTimeout(() => {
        // Register buttons click listeners
        $('#generateStandardArrayBtn').addEventListener('click', generateStandardArray);
        $('#generateOldSchoolRollsBtn').addEventListener('click', generateOldSchoolDiceRolls);
        $('#generateDiceRollsBtn').addEventListener('click', generateDiceRolls);
        $('#generateBalancedRollsBtn').addEventListener('click', generateBalancedRolls);

        // Call the generators for having data when page loads
        renderSkeletons();
    }, 0);
};

main();
