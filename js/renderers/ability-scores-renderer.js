export class AbilityScoresRenderer {
    static render(id, abilityScores) {
        let content = '';
        for (const ablity of Object.keys(abilityScores)) {
            content += /* html */`
            <div class="abilityScore">
                <span class="abilityScoreName">${ablity.toUpperCase()}</span>
                <span class="abilityScoreModifier">${abilityScores[ablity].getModifier()}</span>
                <div class="abilityScoreScoreContainer">
                    <span class="abilityScoreScore">${abilityScores[ablity].getScore()}</span>
                </div>
            </div>
            `;
        }
        document.getElementById(id).innerHTML = /* html */`
            <div class="abilityScores">
                ${content}
            </div>
        `;
    }
}