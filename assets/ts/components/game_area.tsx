import { Component } from 'preact';
import { GameState } from '../gamestate';
import { GameStateRenderer } from './game_state_renderer';
import { Signal, signal } from '@preact/signals';
export interface GameAreaProps {
    gameState: GameState;
}

// we want a class that has the ability to store 5 broadcast messages
// if a new one comes in we throw away the oldest one
export class BroadcastMessageBuffer {
    private buffer: Signal<string[]> = signal([]);

    public addMessage(message: string) {
        const newBuffer = this.buffer.value.slice();
        newBuffer.push(message);
        if (newBuffer.length > 5) {
            newBuffer.shift();
        }
        this.buffer.value = newBuffer;
    }

    public getMessages() {
        return this.buffer;
    }
}



