import 'bootstrap/dist/css/bootstrap.min.css';
// Import JS components as needed
import 'bootstrap';
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

// Create a props object
const props = { 
    gameState: gameState,
    onDrop: (word: string) => {
        console.log("dropped word", word);
    }
 };

// Create an element for the WordPaletteComponent
const element1 = h(WordTargetComponent, props);
const element2 = h(WordTargetComponent, props);

// Render the element
render(element1, document.getElementById('word-target-1')!);
render(element2, document.getElementById('word-target-2')!);