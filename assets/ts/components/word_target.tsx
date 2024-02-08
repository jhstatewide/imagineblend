// This file contains the class for a "word target". This is an element that starts out empty but when we drag a word from the 
// word palette onto it, it will display the word and allow us to drag it back to the word palette. It does this with browser drag and drop support

import { Signal } from "@preact/signals";
import { GameState } from "../gamestate";
import { useState } from "preact/hooks";

interface WordTargetProps {
    onDrop: (word: string) => void;
    gameState: GameState;
}

export function WordTargetComponent(props: WordTargetProps) {
    const [currentWord, setCurrentWord] = useState(null as string | null);
    return (
        <div 
            onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer) {
                    let word = e.dataTransfer.getData("text/plain");
                    console.log("dropped word", word);
                    props.onDrop(word);
                    setCurrentWord(word);
                }
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
            style={{
                border: '2px dashed #007bff',
                padding: '10px',
                margin: '10px',
                textAlign: 'center',
                cursor: 'grab',
            }}
        >
            {currentWord || "Drag and drop a word here"}
        </div>
    );
}