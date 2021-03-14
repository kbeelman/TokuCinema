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
import { MediaDetails } from './MediaDetails';
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
            const path = this.Title + '-' + this.Distributor + '-' + this.Medium + '-' + this.ReleaseDate;
            this.Path = new StringCleaner(path, StringType.WithoutRoute).getCleanString();
        }

        this.setReleaseDate();
    }

    // Draft method for exposing this class without affecting current media details page
    public GetMediaDetails(): MediaDetails {
        return new MediaDetails(
            this.Title,
            this.AspectRatio,
            this.Runtime,
            this.Color,
            this.ChapterStops,
            this.AudioTracksDetails,
            this.SubtitlesDetails,
            // Medium Information
            this.Medium,
            this.Format,
            this.Region,
            this.Country,
            this.MediumCount,
            this.ColorSystem,
            // Distribution Information
            this.Distributor,
            this.CatalogCode,
            this.UPC,
            this.ReleaseDate,
            this.CircaRelease,
            this.ReleaseYear,
            this.PurchaseLinks,
            this.MoviePath,
            this.OriginalRelease,
            this.BoxArt,
            this.ScreencapDescriptions
        );
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
        const keywords = new Array<Keyword>();

        // add exact matches
        keywords.push(new Keyword(this.Title, true, false, false));

        // add title elements (if more than one word)
        const titleElements = this.Title.split(' ');
        if (titleElements.length > 1) {
            titleElements.forEach(element => {
                keywords.push(new Keyword(element, false, true, false));
            });
        }

        // add attribute keywords
        this.Medium.forEach(item => {
            const mediumWords = item.split('-');
            mediumWords.forEach(element => {
                keywords.push(new Keyword(element, false, false, true));
            });
        });

        const countryWords = this.Country.split(' ');
        countryWords.forEach(element => {
            keywords.push(new Keyword(element, false, false, true));
        });
        keywords.push(new Keyword(this.Distributor, false, false, true));

        return this.cleanKeywords(keywords);
    }

    getIconName(): string {
        return this.Medium[0];
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
