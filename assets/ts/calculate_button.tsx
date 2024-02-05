import { GameState } from "./gamestate";

function calculate() {
    // Do something...
}

interface CalculateButtonProps {
    gameState: GameState;
    onClick: () => void;
}

export function CalculateButton(calculateButtonProps: CalculateButtonProps) {
    return (
        <button onClick={calculateButtonProps.onClick}>Calculate</button>
    );
}