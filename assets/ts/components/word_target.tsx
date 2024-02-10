// This file contains the class for a "word target". This is an element that starts out empty but when we drag a word from the 
// word palette onto it, it will display the word and allow us to drag it back to the word palette. It does this with browser drag and drop support

import { Signal } from "@preact/signals";
import { GameState } from "../gamestate";
import { useState } from "preact/hooks";

interface WordTargetProps {
    word: Signal<string>;
}

export function WordTargetComponent(props: WordTargetProps) {
    return (
        <div 
            
            style={{
                border: '2px dashed #007bff',
                padding: '10px',
                margin: '10px',
                textAlign: 'center',
                cursor: 'grab',
                minHeight: '3em'
            }}
        >
            {props.word.value}
        </div>
    );
}