export class AbilityScoresRenderer {
    static render(id, abilityScores) {
        const abScores = [];
        for (const ability of Object.keys(abilityScores)) {
            abScores.push({
                ability,
                score: abilityScores[ability].getScore(),
                modifier: abilityScores[ability].getModifier(),
                rolls: abilityScores[ability].getRolls(),
            });
        }
        this.#render(id, abScores);
    }

    static #render(id, abilityScores) {
        let content = abilityScores
            .map(
                (x) => /* html */ `
            <div class="abilityScore">
                <span class="abilityScoreName">${x.ability.toUpperCase()}</span>
                <span class="abilityScoreNameShort">${x.ability.toUpperCase().substring(0,3)}</span>
                <span class="abilityScoreModifier">${x.modifier}</span>
                <span class="abilityScoreRolls">${x.rolls.length > 0 ? x.rolls.reduce((x, y) => `${x}, ${y}`) : ''}</span>
                <div class="abilityScoreScoreContainer">
                    <span class="abilityScoreScore">${x.score}</span>
                </div>
            </div>
            `
            )
            .reduce((x, y) => x + y);
        document.getElementById(id).innerHTML = /* html */ `
            <div class="abilityScores">
                ${content}
            </div>
        `;
    }

    static renderSkeleton(id, abilityScores) {
        const abScores = [];
        for (const ability of Object.keys(abilityScores)) {
            abScores.push({
                ability,
                score: '?',
                modifier: '?',
                rolls: ['?'],
            });
        }
        this.#render(id, abScores);
    }
}
