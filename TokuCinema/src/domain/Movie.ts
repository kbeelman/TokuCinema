import { Country, Language, Series, Era } from './Types';

export class Movie {
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
}
