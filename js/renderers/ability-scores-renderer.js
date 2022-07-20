export class AbilityScoresRenderer {
    static render(id, abilityScores) {
        let content = '';
        for (const ablity of Object.keys(abilityScores)) {
            content += /* html */ `
            <div class="abilityScore">
                <span class="abilityScoreName">${ablity.toUpperCase()}</span>
                <span class="abilityScoreModifier">${abilityScores[ablity].getModifier()}</span>
                <span class="abilityScoreRolls">${abilityScores[ablity]
                    .getRolls()
                    .reduce((x, y) => `${x}, ${y}`)}</span>
                <div class="abilityScoreScoreContainer">
                    <span class="abilityScoreScore">${abilityScores[ablity].getScore()}</span>
                </div>
            </div>
            `;
        }
        document.getElementById(id).innerHTML = /* html */ `
            <div class="abilityScores">
                ${content}
            </div>
        `;
    }
}
