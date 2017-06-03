import { StringCleaner, StringType } from './StringCleaner';
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
        public Distributor: string,
        public Director: string,
        public Series: Series,
        public Era: Era,
        public Path?: string
    ) {
        // Assign default route if none given, clean either way
        if (this.Path) {
            this.Path = new StringCleaner(this.Path, StringType.WithoutRoute).getCleanString();    
        } else {
            this.Path = new StringCleaner(this.OfficialTitle, StringType.WithoutRoute).getCleanString() + "-" + this.ReleaseYear;
        }
    }

    public getDisplayName(): string {
        return this.OfficialTitle + " (" + this.ReleaseYear + ")";
    }

    public getType(): ItemType {
        return ItemType.Movie;
    }

    public getPath(): string {
        return this.Path;
    }

}
