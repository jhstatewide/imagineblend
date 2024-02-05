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