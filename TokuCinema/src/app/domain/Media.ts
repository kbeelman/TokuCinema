import { StringCleaner, StringType } from './StringCleaner';
import {
    ColorSystemType,
    LanguageType,
    MediaVendor,
    MediumCount,
    MediumFormat,
    MediumRegion,
    VersionAspectRatio,
    VersionChapters,
    VersionColor,
    VersionRuntime
} from './Types';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';
import { Keyword } from './Keyword';
import { Movie } from './Movie';

export class Media implements ISearchable {
    public ReleaseYear: number = 0;
    public ReleaseDate: Date | undefined = new Date();
    public CircaRelease: string = '';
    public ImageCard: string = '';
    public ImageDetails: string = '';
    public hasDifferentAspectRatios: boolean = false;
    public hasDifferentColors: boolean = false;

    constructor(
        // Main Feature Info
        public Title: string,
        public AspectRatio: Array<VersionAspectRatio>,
        public Runtime: Array<VersionRuntime>,
        public Color: Array<VersionColor>,
        public ChapterStops: Array<VersionChapters>,
        public Subtitles: Array<string>,
        public SubtitlesDetails: Array<LanguageType>,
        public AudioTracks: Array<string>,
        public AudioTracksDetails: Array<LanguageType>,
        // Medium Information
        public Medium: Array<string>,
        public Format: Array<MediumFormat>,
        public Region: Array<MediumRegion>,
        public Country: string,
        public MediumCount: Array<MediumCount>,
        public ColorSystem: ColorSystemType,
        public ScreencapDescriptions: Array<string>,
        // Distributor Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDateString: string,
        public PurchaseLinks: Array<MediaVendor>,
        public MoviePath: Array<string>,
        public OriginalRelease: string,
        public BoxArt: Array<string>,
        public Path: string,
        public Movies: Array<Movie>
    ) {
        if (this.Path) {
            this.Path = new StringCleaner(this.Path, StringType.WithoutRoute).getCleanString();
        } else {
            const path: string = this.Title + '-' + this.Distributor + '-' + this.Medium + '-' + this.ReleaseDate;
            this.Path = new StringCleaner(path, StringType.WithoutRoute).getCleanString();
        }

        this.setReleaseDate();

        this.setHasDifferentAspectRatios();
        this.setHasDifferentColors();
    }

    public setReleaseDate(): void {
        if (isNaN(Number(this.ReleaseDateString.substr(0, 4)))) {
            this.ReleaseDate = undefined;
            this.CircaRelease = this.ReleaseDateString;
            this.ReleaseYear = Number(this.ReleaseDateString.substr(6, 4));
        } else {
            (this.ReleaseDate as Date).setFullYear(Number(this.ReleaseDateString.substr(0, 4)));
            (this.ReleaseDate as Date).setMonth(Number(this.ReleaseDateString.substr(5, 2)) - 1);
            (this.ReleaseDate as Date).setDate(Number(this.ReleaseDateString.substr(8, 2)));
            (this.ReleaseDate as Date).setHours(0, 0, 0 , 0); // Zero-out the time

            this.ReleaseYear = (this.ReleaseDate as Date).getFullYear();
        }

    }

    public getDisplayName(): string {
        return this.Title + ' | ' + this.Distributor + ' ' + this.Medium;
    }

    public getType(): ItemType {
        return ItemType.Media;
    }

    public getPath(): string {
        return this.Path;
    }

    public getKeywords(): Array<Keyword> {
        const keywords: Array<Keyword> = new Array<Keyword>();

        // add exact matches
        keywords.push(new Keyword(this.Title, true, false, false));

        // add title elements (if more than one word)
        const titleElements: string[] = this.Title.split(' ');
        if (titleElements.length > 1) {
            titleElements.forEach((element: string) => {
                keywords.push(new Keyword(element, false, true, false));
            });
        }

        // add attribute keywords
        this.Medium.forEach((item: string) => {
            const mediumWords: string[] = item.split('-');
            mediumWords.forEach((element: string) => {
                keywords.push(new Keyword(element, false, false, true));
            });
        });

        const countryWords: string[] = this.Country.split(' ');
        countryWords.forEach((element: string) => {
            keywords.push(new Keyword(element, false, false, true));
        });
        keywords.push(new Keyword(this.Distributor, false, false, true));

        return this.cleanKeywords(keywords);
    }

    public getIconName(): string {
        return this.Medium[0];
    }

    public doesAspectRatioExist(): boolean {
        return typeof this.AspectRatio !== 'undefined' && this.AspectRatio.length > 0;
    }

    public getHasDifferentAspectRatios(): boolean {
        return this.hasDifferentAspectRatios;
    }

    public doesColorExist(): boolean {
        if (typeof this.Color !== 'undefined' && this.Color.length > 0) {
            return true;
        }
        return false;
    }

    public getHasDifferentColors(): boolean {
        return this.hasDifferentColors;
    }

    public doesRuntimeExist(): boolean {
        return typeof this.Runtime !== 'undefined' && this.Runtime.length > 0;
    }

    public doesMediumExist(): boolean {
        return typeof this.Medium !== 'undefined' && this.Medium.length > 0;
    }

    public doesFormatExist(): boolean {
        return typeof this.Format !== 'undefined' && this.Format.length > 0;
    }

    public doesMediumCountExist(): boolean {
        return typeof this.MediumCount !== 'undefined' && this.MediumCount.length > 0;
    }

    public doesRegionExist(): boolean {
        return typeof this.Region !== 'undefined' && this.Region.length > 0;
    }

    public getFirstMedium(): string {
      return this.Medium && this.Medium.length >= 1 ? this.Medium[0] : '';
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

    /**
     * @description Determines if the media has multiple AspectRatios.
     */
    private setHasDifferentAspectRatios(): void {
        const aspectCompArray: Array<string> = [];
        this.AspectRatio.forEach((element: VersionAspectRatio) => {
            if (aspectCompArray.indexOf(element.AspectRatio) < 0) {
                aspectCompArray.push(element.AspectRatio);
            }
        });
        if (aspectCompArray.length > 1) {
            this.hasDifferentAspectRatios = true;
        }
    }

    /**
     * @description Determines if the media has multiple Colors.
     */
    private setHasDifferentColors(): void {
        const colorCompArray: Array<string> = [];
        this.Color.forEach((element: VersionColor) => {
            if (colorCompArray.indexOf(element.Color) < 0) {
                colorCompArray.push(element.Color);
            }
        });
        if (colorCompArray.length > 1) {
            this.hasDifferentColors = true;
        }
    }
}
