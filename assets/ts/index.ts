import 'bootstrap/dist/css/bootstrap.min.css';
// Import JS components as needed
import 'bootstrap';
import 'preact/debug';
import 'preact';

import { GameState } from "./gamestate"; // Import the GameState class

// make a new game state
let gameState = new GameState();
import "./components/word_palette";

import { h, render } from 'preact';
import { WordPaletteComponent } from './components/word_palette';
import { WordTargetComponent } from './components/word_target';
import { AnswerArea } from './components/answer_area';
import { CalculateButton } from './components/calculate_button';
import { GameStateRenderer } from './components/game_state_renderer';
import { AddAPIClient } from './api/add_api_client';
import { GameArea } from './components/GameArea';

const gameArea = h(GameArea, { gameState: gameState });
render(gameArea, document.getElementById('game-area')!);