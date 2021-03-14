import { StringCleaner, StringType } from './StringCleaner';
import {
    Actor,
    CountryType,
    CrewMember,
    EraType,
    LanguageType,
    SeriesType,
    Title
} from './Types';
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
        public AlternateTitles: Array<Title>,
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
        public Crew: Array<CrewMember>,
        public Cast: Array<Actor>,
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
        const keywords: Array<Keyword> = new Array<Keyword>();

        // add title elements (if more than one word)
        const titleElements: string[] = this.OfficialTitle.split(' ');
        if (titleElements.length > 1) {
            titleElements.forEach((element: string) => {
                keywords.push(new Keyword(element, false, true, false));
            });
        }

        // add exact matches
        keywords.push(new Keyword(this.OfficialTitle, true, false, false));
        // alternate titles are exact matches as well
        if (this.AlternateTitles && this.AlternateTitles.length) {
            this.AlternateTitles.forEach((element: Title) => {
                keywords.push(new Keyword(element.TitleValue, true, false, false));
            });

            this.AlternateTitles.forEach((element: Title) => {
                const alternateTitleWords: string[] = element.TitleValue.split(' ');
                if (alternateTitleWords.length > 1) {
                    alternateTitleWords.forEach((subElement: string) => {
                        keywords.push(new Keyword(subElement, false, true, false));
                    });
                }
            });
        }

        // add attribute keywords
        keywords.push(new Keyword(this.CountryOfOrigin, false, false, true));

        const directorNames: string[] = this.Director.split(' ');
        directorNames.forEach((element: string) => {
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
        return typeof this.OriginalPoster !== 'undefined' && this.OriginalPoster.length > 1;
    }

    public doesAlternateTitlesExist(): boolean {
        return typeof this.AlternateTitles !== 'undefined' && this.AlternateTitles.length > 0;
    }

    public doesCastExist(): boolean {
        return typeof this.Cast !== 'undefined' && this.Cast.length > 0;
    }

    public doesCrewExist(): boolean {
        return typeof this.Crew !== 'undefined' && this.Crew.length > 0;
    }

    public doesCastOrCrewExist(): boolean {
        return this.doesCastExist() || this.doesCrewExist();
    }

    private cleanKeywords(keywords: Array<Keyword>): Array<Keyword> {
        const cleanKeywords: Array<Keyword> = new Array<Keyword>();

        keywords.forEach((element: Keyword) => {
            if (element.word !== '') {
                cleanKeywords.push(element);
            }
        });

      return cleanKeywords;
    }
}
