import { AddAPIClient } from "../api/add_api_client";
import { GameState } from "../gamestate";

function calculate() {
    // Do something...
}

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
            gameState.answer.value = "SNEED";
            let apiClient = new AddAPIClient();
            apiClient.addWords(word1, word2).then((result) => {
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
            });
        }
    }

    return (
        <button onClick={onClick}>Calculate</button>
    );
}