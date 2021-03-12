import { StringCleaner, StringType } from './StringCleaner';
import { CountryType, LanguageType, SeriesType, EraType } from './Types';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';
import { Keyword } from './Keyword';

export class Movie implements ISearchable {
    public ReleaseYear: number = 0;
    public ReleaseDate: Date | undefined = new Date();
    public CircaRelease: string = '';
    public ImageCard: string = '';
    public ImageDetails: string = '';

    constructor(
        public OfficialTitle: string,
        public AlternateTitles: Array<{'TitleType': string; 'TitleValue': string}>,
        public OriginalPoster: Array<string>,
        public ReleaseDateString: string,
        public ProductionCompany: string,
        public CountryOfOrigin: CountryType,
        public Languages: Array<LanguageType>,
        public Distributor: string,
        public Director: string,
        public Series: SeriesType,
        public Era: EraType,
        public Runtime: number,
        public Crew: Array<{'PositionTitle': string; 'Name': string}>,
        public Cast: Array<{'ActorName': string; 'RoleName': string}>,
        public MediaPath: Array<string>,
        public AlternateVersionsPath: Array<string>,
        public Path: string,
        public Videos?: Array<string>
    ) {
        // Assign default route if none given, clean either way
        if (this.Path) {
            this.Path = new StringCleaner(this.Path, StringType.WithoutRoute).getCleanString();
        } else {
            this.Path = new StringCleaner(this.OfficialTitle, StringType.WithoutRoute).getCleanString() + '-' + this.ReleaseYear;
        }
        this.setReleaseDate();
    }

    public setReleaseDate(): void {
        if (isNaN(Number(this.ReleaseDateString.substr(0, 4))) || (this.ReleaseDateString.length !== 10)) {
            this.ReleaseDate = undefined;
            this.CircaRelease = this.ReleaseDateString;
            this.ReleaseYear = Number(this.ReleaseDateString.substr(6, 4));
        } else {
            (this.ReleaseDate as Date).setFullYear(Number(this.ReleaseDateString.substr(0, 4)));
            (this.ReleaseDate as Date).setMonth(Number(this.ReleaseDateString.substr(5, 2)) - 1);
            (this.ReleaseDate as Date).setDate(Number(this.ReleaseDateString.substr(8, 2)));
            (this.ReleaseDate as Date).setHours(0, 0, 0, 0); // Zero-out the time

            this.ReleaseYear = (this.ReleaseDate as Date).getFullYear();
        }

    }

    public getDisplayName(searchTerm: string): string {
        let displayName = this.OfficialTitle + ' (' + this.ReleaseYear + ')';

        if (this.AlternateTitles && this.AlternateTitles.length) {
            const relaventAltTitle = this.AlternateTitles.find( item => item.TitleValue.toLowerCase().trim().replace(/\W/g, '')
              .indexOf(searchTerm.toLowerCase().trim().replace(/\W/g, '')) >= 0
              && item.TitleType !== 'Literal Translation');

            if (relaventAltTitle) {
              displayName += '<p><em>' + relaventAltTitle.TitleValue + '</em></p>';
            } else {
              displayName += '<p><em>' + this.AlternateTitles[0].TitleValue + '</em></p>';
            }
        }

        if (displayName.length > 75) {
          displayName = displayName.slice(0, 75);
          displayName += '...';
        }

        return displayName;
    }

    public getType(): ItemType {
        return ItemType.Movie;
    }

    public getPath(): string {
        return this.Path;
    }

    public getKeywords(): Array<Keyword> {
        const keywords = new Array<Keyword>();

        // add title elements (if more than one word)
        const titleElements = this.OfficialTitle.split(' ');
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
                const alternateTitleWords = element.TitleValue.split(' ');
                if (alternateTitleWords.length > 1) {
                    alternateTitleWords.forEach(subElement => {
                        keywords.push(new Keyword(subElement, false, true, false));
                    });
                }
            });
        }

        // add attribute keywords
        keywords.push(new Keyword(this.CountryOfOrigin, false, false, true));

        const directorNames = this.Director.split(' ');
        directorNames.forEach(element => {
            keywords.push(new Keyword(element, false, false, true));
        });
        keywords.push(new Keyword(this.Distributor, false, false, true));
        keywords.push(new Keyword(this.ReleaseYear.toString(), false, false, true));

        return this.cleanKeywords(keywords);
    }

    getIconName(): string {
        return 'movies';
    }

    public doesPosterExist(): boolean {
        if (typeof this.OriginalPoster !== 'undefined') {
            if (this.OriginalPoster.length > 1) {
                return true;
            }
        }
        return false;
    }

    public doesAlternateTitlesExist(): boolean {
        if (typeof this.AlternateTitles !== 'undefined') {
            if (this.AlternateTitles.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCastExist(): boolean {
        if (typeof this.Cast !== 'undefined') {
            if (this.Cast.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCrewExist(): boolean {
        if (typeof this.Crew !== 'undefined') {
            if (this.Crew.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesCastOrCrewExist(): boolean {
        if (this.doesCastExist || this.doesCrewExist()) {
            return true;
        } else {
            return false;
        }
    }

    private cleanKeywords(keywords: Array<Keyword>): Array<Keyword> {
        const cleanKeywords = new Array<Keyword>();

        keywords.forEach(element => {
            if (element.word !== '') {
                cleanKeywords.push(element);
            }
        });

      return cleanKeywords;
    }
}
