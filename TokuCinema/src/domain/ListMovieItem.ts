export class ListMovieItem {
    constructor(
        public MovieTitle: string,
        public AltTitle: string,
        public PosterUrl: string,
        public ReleaseYear: number,
        public ProductionCompany: string,
        public CountryFlag: string
    ) {}
}