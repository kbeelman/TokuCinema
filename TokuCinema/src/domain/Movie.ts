import { StringCleaner, StringType } from './StringCleaner';
import { Country, Language, Series, Era } from './Types';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';
import { Keyword } from './Keyword';

export class Movie implements ISearchable {

    constructor(
        public OfficialTitle: string,
        public AlternateTitles: Array<{"TitleType": string, "TitleValue": string}>,
        public OriginalPoster: string,
        public ReleaseYear: number,
        public ProductionCompany: string,
        public CountryOfOrigin: Country,
        public Languages: Array<Language>,
        public Distributor: string,
        public Director: string,
        public Series: Series,
        public Era: Era,
        public Runtime: number,
        public Crew: Array<{"PositionTitle": string, "Name": string}>,
        public Cast: Array<{"ActorName": string, "RoleName": string}>,
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

    public getKeywords(): Array<Keyword> {
        let keywords = new Array<Keyword>();

        // add title elements (if more than one word)
        let titleElements = this.OfficialTitle.split(' ');
        if (titleElements.length > 1) {
            titleElements.forEach(element => {
                keywords.push(new Keyword(element, false, true, false));
            });
        }

        // add exact matches
        keywords.push(new Keyword(this.OfficialTitle, true, false, false));
        // alternate titles are exact matches as well
        if (this.AlternateTitles && this.AlternateTitles.length) {
            this.AlternateTitles.forEach(element => {
                keywords.push(new Keyword(element.TitleValue, true, false, false));
            });

            this.AlternateTitles.forEach(element => {
                let alternateTitleWords = element.TitleValue.split(' ');
                if (alternateTitleWords.length > 1) {
                    alternateTitleWords.forEach(element => {
                        keywords.push(new Keyword(element, false, true, false));
                    });
                }
            });
        }

        // add attribute keywords
        keywords.push(new Keyword(this.CountryOfOrigin, false, false, true));

        let directorNames = this.Director.split(' ');
        directorNames.forEach(element => {
            keywords.push(new Keyword(element, false, false, true));
        });
        keywords.push(new Keyword(this.Distributor, false, false, true));
        keywords.push(new Keyword(this.ReleaseYear.toString(), false, false, true));

        return keywords;
    }

    getIconName(): string {
        return 'movies';
    }

    public doesAtlernateTitlesExist(): boolean {
        if(typeof this.AlternateTitles !== "undefined") {
            if (this.AlternateTitles.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCastExist(): boolean {
        if(typeof this.Cast !== "undefined") {
            if (this.Cast.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCrewExist(): boolean {
        if(typeof this.Crew !== "undefined") {
            if (this.Crew.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCastOrCrewExist(): boolean {
        if(this.doesCastExist || this.doesCrewExist()) {
            return true;
        }
        else {
            return false;
        }
    }
}
