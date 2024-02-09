import { Component } from 'preact';
import { WordPaletteComponent } from './word_palette';
import { GameState } from '../gamestate';
import { WordTargetComponent } from './word_target';
import { AnswerArea } from './answer_area';
import { GameStateRenderer } from './game_state_renderer';
import { MessageList } from './message_list';
import { CalculateButton } from './calculate_button';
import { Signal, signal } from '@preact/signals';

interface GameAreaProps {
    gameState: GameState;
}

// we want a class that has the ability to store 5 broadcast messages
// if a new one comes in we throw away the oldest one
class BroadcastMessageBuffer {
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

import { useEffect, useState } from 'preact/hooks';

export function GameArea(props: GameAreaProps) {

    const [messages, setMessages] = useState<string[]>([]);
    const broadcastMessageBuffer = new BroadcastMessageBuffer();

    useEffect(() => {
        // add SSE listener
        console.log("Registering SSE listener");
        const eventSource = new EventSource('/sse');

        eventSource.onmessage = function (event) {
            console.log('SSE event received');
            console.log(event.data);
            broadcastMessageBuffer.addMessage(event.data);
        };

        eventSource.onerror = function (event) {
            console.log('SSE error');
            console.log(event);
            // now print a descriptive message
            if (event.eventPhase === EventSource.CLOSED) {
                console.log('SSE connection closed');
            } else {
                console.log('SSE connection error');
            }
        };

        eventSource.addEventListener('connected', function (event) {
            console.log('SSE connected');
            console.log(event);
        });

        return () => {
            console.log("Unregistering SSE listener");
            eventSource.close();
        };
    });

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
                    <span style={{ textAlign: 'center', display: 'block' }}>+</span>
                </div>

                <div class="col-3 ingredient-container">
                    <WordTargetComponent word={props.gameState.word2}></WordTargetComponent>
                </div>

                <div class="col-1 my-auto">
                    <span style={{ textAlign: 'center', display: 'block' }}>=</span>
                </div>

                <div class="col-3 my-auto">
                    <AnswerArea gameState={props.gameState}></AnswerArea>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <CalculateButton gameState={props.gameState}></CalculateButton>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <MessageList messages={broadcastMessageBuffer.getMessages()}></MessageList>
                </div>
            </div>
        </div>
    );
}
