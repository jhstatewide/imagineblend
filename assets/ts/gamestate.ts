import { Signal, signal } from "@preact/signals";

// the idea behind this class is that it holds all the state of the game. one thing we need is a list of words that defaults to the 4 elements
// and it gets added to during the game
export class GameState {
    public defaultWords: string[] = ["fire", "water", "earth", "air"];
    public words: Signal<string[]>;
    constructor() {
        this.words = signal(this.defaultWords);
    }
}