import { render } from "preact";
import { GameState } from "../gamestate";
import { Signal } from "@preact/signals";

const defaultWords = [
    "EARTH",
    "WIND",
    "FIRE",
    "WATER"
]

interface WordPaletteProps {
    words: Signal<string[]>;
    gameState: GameState;
}

export function WordPaletteComponent(props: WordPaletteProps) {
    // for each word we want a draggable badge
    const handleDragStart = (e: DragEvent, word: string) => {
        e.dataTransfer!.setData("text/plain", word);
    }

    function onClick(word: string) {
        props.gameState.wordClicked(word);
    };

    return (
        <div>
            {props.words.value.map((word) => {
                return (
                    <button
                        style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            margin: '5px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '20px',
                        }}
                        onClick={() => onClick(word)}
                    >
                        {word}
                    </button>
                );
            })}
        </div>
    );
}

export function createComponents(gameState: GameState) {
    let targetElement = document.querySelector("#word-palette");
    render(<WordPaletteComponent words={gameState.words} />, targetElement!);
}