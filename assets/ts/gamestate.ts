import { Signal, signal } from "@preact/signals";

// the idea behind this class is that it holds all the state of the game. one thing we need is a list of words that defaults to the 4 elements
// and it gets added to during the game
export class GameState {

    private whichWord = 1;
    isThinking: Signal<boolean> = signal(false);

    wordClicked(word: string) {
        if (this.whichWord == 1) {
            this.word1.value = word;
            this.whichWord = 2;
        } else {
            this.word2.value = word;
            this.whichWord = 1;
        }
    }

    public defaultWords: string[] = ["FIRE", "WATER", "EARTH", "AIR", "SUN"];
    public words: Signal<string[]>;
    public word1: Signal<string> = signal("");
    public word2: Signal<string> = signal("");
    public answer: Signal<string> = signal("");
    constructor() {
        this.words = signal(this.defaultWords);
    }
}