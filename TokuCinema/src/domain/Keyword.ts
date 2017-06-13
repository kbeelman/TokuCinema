export class Keyword {
    public score: number;

    constructor(
        public word: string,
        public exactMatch: boolean,
        public titleElement: boolean,
        public attribute: boolean
    ){
        this.calculateScore();
    }

    private calculateScore(): void {
        if (this.exactMatch) {
            this.score = 1000;
        } else if (this.titleElement) {
            this.score = 5 * this.word.length;
        } else if (this.attribute) {
            this.score = 3 * this.word.length;
        }
    }

}