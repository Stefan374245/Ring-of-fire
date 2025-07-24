
export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public currentCard: string | null = null;

    constructor() {
        for (let i = 0; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('clubs_' + i);
    }
    shuffle(this.stack);
}
}

function shuffle(stack: string[]): string[] {
    for (let i = stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }
    return stack;
}
    