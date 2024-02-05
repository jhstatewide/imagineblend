import 'bootstrap/dist/css/bootstrap.min.css';
// Import JS components as needed
import 'bootstrap';
import 'preact/debug';
import 'preact';

import { GameState } from "./gamestate"; // Import the GameState class

// make a new game state
let gameState = new GameState();
import "./word_palette";
import { createComponents } from './word_palette';

createComponents(gameState);

import { h, render } from 'preact';
import { WordPaletteComponent } from './word_palette';
import { WordTargetComponent } from './word_target';
import { AnswerArea } from './answer_area';
import { CalculateButton } from './calculate_button';
import { GameStateRenderer } from './game_state_renderer';
import { AddAPIClient } from './api/add_api_client';

// Create a props object
const element1Props = { 
    gameState: gameState,
    onDrop: (word: string) => {
        console.log("Setting word1 -> ", word);
        gameState.word1.value = word;
    }
 };

const element2Props = {
    gameState: gameState,
    onDrop: (word: string) => {
        console.log("Setting word2 -> ", word);
        gameState.word2.value = word;
    }
}

// Create an element for the WordPaletteComponent
const element1 = h(WordTargetComponent, element1Props);
const element2 = h(WordTargetComponent, element2Props);

// Render the element
render(element1, document.getElementById('word-target-1')!);
render(element2, document.getElementById('word-target-2')!);

const calculateButtonProps = {
    gameState: gameState,
    onClick: () => {
        console.log("Got a click...");
        let word1 = gameState.word1.value;
        let word2 = gameState.word2.value;
        if (word1 && word2) {
            console.log("Calculating...");
            let result = word1 + word2;
            console.log("Result: ", result);
            gameState.answer.value = "SNEED";
            let apiClient = new AddAPIClient();
            apiClient.addWords(word1, word2).then((result) => {
                console.log("Got a result: ", result);
                gameState.answer.value = result;
            }).catch((error) => {
                console.log("Got an error: ", error);
                gameState.answer.value = "ERROR";
            });
        }
    }
}

const calculateButton = h(CalculateButton, calculateButtonProps);
render(calculateButton, document.getElementById('calculate-button')!);

const answerAreaProps = {
    gameState: gameState
}

const answerArea = h(AnswerArea, answerAreaProps);
render(answerArea, document.getElementById('answer-area')!);

const gameStateArea = h(GameStateRenderer, { gameState: gameState });
render(gameStateArea, document.getElementById('game-state-renderer')!);