import { Component } from 'preact';
import { WordPaletteComponent } from './word_palette';
import { GameState } from '../gamestate';
import { WordTargetComponent } from './word_target';
import { AnswerArea } from './answer_area';
import { GameStateRenderer } from './game_state_renderer';
import { CalculateButton } from './calculate_button';

interface GameAreaProps {
    gameState: GameState;
}

export function GameArea(props: GameAreaProps) {
    return (
        <div className="game-area">
            <div class="row">
                <div class="col-12">
                    <WordPaletteComponent words={props.gameState.words} gameState={props.gameState} />
                </div>
            </div>

            <div class="row">
                <div class="col-3 ingredient-container">
                    <WordTargetComponent word={props.gameState.word1}></WordTargetComponent>
                </div>

                <div class="col-1 my-auto">
                    <span style={{textAlign: 'center', display: 'block'}}>+</span>
                </div>

                <div class="col-3 ingredient-container">
                    <WordTargetComponent word={props.gameState.word2}></WordTargetComponent>
                </div>

                <div class="col-1 my-auto">
                    <span style={{textAlign: 'center', display: 'block'}}>=</span>
                </div>

                <div class="col-3">
                    <AnswerArea gameState={props.gameState}></AnswerArea>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <CalculateButton gameState={props.gameState}></CalculateButton>
                </div>
            </div>
        </div>
    );
}
