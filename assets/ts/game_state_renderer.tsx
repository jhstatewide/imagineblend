import { GameState } from "./gamestate";

interface GameStateRendererProps {
    gameState: GameState;
}

export function GameStateRenderer(props: GameStateRendererProps) {
    return (
        <div>
            <h1>Game State</h1>
            <p>Word 1: {props.gameState.word1.value}</p>
            <p>Word 2: {props.gameState.word2.value}</p>
            <p>Answer: {props.gameState.answer.value}</p>
            <p>Words: {props.gameState.words.value.join(", ")}</p>
        </div>
    );
}