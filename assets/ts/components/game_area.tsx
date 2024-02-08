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

export class GameArea extends Component<GameAreaProps, any>{
    render(props: GameAreaProps) {
        return (
            <div className="game-area">
                <div class="row">
                    <div class="col-12">
                        <WordPaletteComponent words={props.gameState.words} />
                    </div>
                </div>

                <div class="row">
                    <div class="col-3 ingredient-container">
                        <WordTargetComponent gameState={props.gameState} onDrop={ (word) => props.gameState.word1.value = word }></WordTargetComponent>
                    </div>

                    <div class="col-1">
                        +
                    </div>

                    <div class="col-3 ingredient-container">
                        <WordTargetComponent gameState={props.gameState} onDrop={ (word) => props.gameState.word2.value = word }></WordTargetComponent>
                    </div>

                    <div class="col-1">
                        =
                    </div>

                    <div class="col-3">
                        <AnswerArea gameState={props.gameState}></AnswerArea>
                        <CalculateButton gameState={props.gameState} onClick={() => {}}></CalculateButton>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <GameStateRenderer gameState={props.gameState}></GameStateRenderer>
                    </div>
                </div>
            </div>
        );
    }
}