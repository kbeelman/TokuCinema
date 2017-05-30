import { Country, Language, Series, Era } from './Types';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class Movie implements ISearchable {
    constructor(
        public OfficialTitle: string,
        public AlternateTitles: Array<string>,
        public OriginalPoster: string,
        public ReleaseYear: number,
        public ProductionCompany: string,
        public CountryOfOrigin: Country,
        public Languages: Array<Language>,
        public Studio: string,
        public Director: string,
        public Series: Series,
        public Era: Era
    ) {}

    public getName(): string {
        return this.OfficialTitle;
    }

    public getType(): ItemType {
        return ItemType.Movie;
    }
}
