import { ImagineBlendAPIClient, WordOperator } from "../api/imagineblend_api_client";
import { GameState } from "../gamestate";
import { isMobile } from "../utils";

interface CalculateButtonProps {
    gameState: GameState;
}

export function CalculateButton(calculateButtonProps: CalculateButtonProps) {
    function onClick() {
        let gameState = calculateButtonProps.gameState;
        console.log("Got a click...");
        let word1 = gameState.word1.value;
        let word2 = gameState.word2.value;
        if (word1 && word2) {
            console.log("Calculating...");
            gameState.answer.value = "Calculating...";

            // try to emit a google analytics event using gtag
            try {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'calculate', {
                        'event_category': 'calculate',
                        'event_label': 'calculate',
                        'word1': word1,
                        'word2': word2
                    });
                }
            } catch (e) {
                console.log("Error sending gtag event: ", e);
            }

            // disable the button while we're thinking
            gameState.isThinking.value = true;
            let apiClient = new ImagineBlendAPIClient();

            let apiCall = gameState.operator.value === WordOperator.ADD ? apiClient.addWords(word1, word2) : apiClient.subtractWords(word1, word2);
            let delay = new Promise(resolve => setTimeout(resolve, 1500));

            Promise.all([apiCall, delay]).then(([result]) => {
                console.log("Got a result: ", result);
                gameState.answer.value = result;
                // also add the result to the word palette
                // make sure the word doesn't already exist
                if (gameState.words.value.indexOf(result) !== -1) {
                    console.log("Word already exists, not adding");
                } else {
                    gameState.words.value = gameState.words.value.concat([result]);
                }
            }).catch((error) => {
                console.log("Got an error: ", error);
                gameState.answer.value = "ERROR";
            }).finally(() => {
                gameState.isThinking.value = false;
            });
        }
    }

    return (
        <button style={{'width': '100%'}} disabled={calculateButtonProps.gameState.isThinking} onClick={onClick} className="btn btn-primary btn-lg btn-block">Blend</button>
    );
}