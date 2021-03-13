// locked at 1 point
const ignoreList: Array<string> = [
    'of',
    'the',
    'and'
];

export class Keyword {
    public score: number;

    constructor(
        public word: string,
        public exactMatch: boolean,
        public titleElement: boolean,
        public attribute: boolean
    ) {
        this.word = this.word.replace(/\W/g, '').toLowerCase();
        this.score = this.calculateScore();
        this.negateIgnoreList();
    }

    private calculateScore(): number {
        let score;
        if (this.exactMatch) {
            score = 1000;
        } else if (this.titleElement) {
            score = 100 * this.word.length;
        } else if (this.attribute) {
            score = 50 * this.word.length;
        } else {
            score = 0;
        }

        return score;
    }

    private negateIgnoreList(): void {
        if (ignoreList.indexOf(this.word) >= 0) {
            this.score = 1;
        }
    }

}
