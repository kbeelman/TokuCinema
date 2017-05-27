import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class ListMovieItem implements ISearchable {
    constructor(
        public MovieTitle: string,
        public AltTitle: string,
        public PosterUrl: string,
        public ReleaseYear: number,
        public ProductionCompany: string,
        public CountryFlag: string
    ) {}

    getName(): string {
        return this.MovieTitle;
    }

    getType(): ItemType {
        return ItemType.Movie;
    }
}