// locked at 1 point
const ignoreList: Array<string> = [
    "of", 
    "the",
    "and"
];

export class Keyword {
    public score: number;

    constructor(
        public word: string,
        public exactMatch: boolean,
        public titleElement: boolean,
        public attribute: boolean
    ){
        this.word = this.word.replace(/\W/g, '').toLowerCase();
        this.calculateScore();
        this.negateIgnoreList();
    }

    private calculateScore(): void {
        if (this.exactMatch) {
            this.score = 1000;
        } else if (this.titleElement) {
            this.score = 100 * this.word.length;
        } else if (this.attribute) {
            this.score = 50 * this.word.length;
        }
    }

    private negateIgnoreList(): void {
        if (ignoreList.indexOf(this.word) >= 0) {
            this.score = 1;
        }
    }

}