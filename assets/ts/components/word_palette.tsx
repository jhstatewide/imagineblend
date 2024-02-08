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
}

export function WordPaletteComponent(props: WordPaletteProps) {
    // for each word we want a draggable badge
    const handleDragStart = (e: DragEvent, word: string) => {
        e.dataTransfer!.setData("text/plain", word);
    }

    return (
        <div>
            {props.words.value.map((word) => {
                return (
                    <span 
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, word)}
                        style={{
                            display: 'inline-block',
                            padding: '5px 10px',
                            margin: '5px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '20px',
                            cursor: 'grab',
                        }}
                    >
                        {word}
                    </span>
                );
            })}
        </div>
    );
}

export function createComponents(gameState: GameState) {
    let targetElement = document.querySelector("#word-palette");
    render(<WordPaletteComponent words={gameState.words} />, targetElement!);
}