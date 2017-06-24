import { StringCleaner, StringType } from './StringCleaner';
import { AspectRatio, ColorSystem, ColorType, Language, Medium, Format } from './Types';
import { MediaDetails } from './MediaDetails';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';
import { Keyword } from './Keyword';
import { Movie } from './Movie';

export class Media implements ISearchable{

    constructor(
        // Main Feature Info
        public Title: string,
        public AspectRatio: Array<{"Version": string, "AspectRatio": string}>,
        public Runtime: Array<{"Version": string, "Runtime": number}>,
        public Color: Array<{"Version": string, "Color": string}>,
        public ChapterStops: Array<{"Version": string, "Count": number}>,
        public Subtitles: Array<string>,
        public SubtitlesDetails: Array<Language>,
        public AudioTracks: Array<string>,
        public AudioTracksDetails: Array<Language>,
        // Medium Information
        public Medium: Array<string>,
        public Format: Array<{"Medium": string, "Format": number}>,
        public Region: Array<{"Medium": string, "Region": string}>,
        public Country: string,
        public MediumCount: Array<{"Medium": string, "Count": number}>,
        public ColorSystem: ColorSystem,
        public Screencaps: Array<string>,
        // Distributor Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDate: Date,
        public PurchaseLinks: Array<{"Vendor": string, "Link": string}>,
        public MoviePath: Array<string>,
        public OriginalRelease: string,
        public BoxArt: string,
        public Path?: string,
        public Movies?: Array<Movie>
    ) {
        if (this.Path) {
            this.Path = new StringCleaner(this.Path, StringType.WithoutRoute).getCleanString();
        } else {
            let path = this.Title + "-" + this.Distributor + "-" + this.Medium + "-" + this.ReleaseDate;
            this.Path = new StringCleaner(path, StringType.WithoutRoute).getCleanString();
        }
    }

    // Draft method for exposing this class without affecting current media details page
    public GetMediaDetails(): MediaDetails {
        let mediaDetails = new MediaDetails(
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
            this.PurchaseLinks,
            this.MoviePath,
            this.OriginalRelease,
            this.BoxArt,
            this.Screencaps
        );
        return mediaDetails;
    }

    public getDisplayName(): string {
        return this.Title + " | " + this.Distributor + " " + this.Medium;
    }

    public getType(): ItemType {
        return ItemType.Media;
    }

    public getPath(): string {
        return this.Path;
    }

    public getKeywords(): Array<Keyword> {
        let keywords = new Array<Keyword>();

        // add exact matches
        keywords.push(new Keyword(this.Title, true, false, false));
        //keywords.push(new Keyword(this.OriginalTitle, true, false, false));

        // add title elements (if more than one word)
        let titleElements = this.Title.split(' ');
        if (titleElements.length > 1) {
            titleElements.forEach(element => {
                keywords.push(new Keyword(element, false, true, false));
            });
        }
        // treat original title elements as title elements
        // let originalTitleElements = this.OriginalTitle.split(' ');
        // if (originalTitleElements.length > 1) {
        //     originalTitleElements.forEach(element => {
        //         keywords.push(new Keyword(element, false, true, false));
        //     });
        // }

        // add attribute keywords

        this.Medium.forEach(item => {
            let mediumWords = item.split('-');
            mediumWords.forEach(element => {
                keywords.push(new Keyword(element, false, false, true));
            });
        })
        // let mediumWords = this.Medium.split('-');
        // mediumWords.forEach(element => {
        //     keywords.push(new Keyword(element, false, false, true));
        // });

        //keywords.push(new Keyword(this.Format, false, false, true));

        let countryWords = this.Country.split(' ');
        countryWords.forEach(element => {
            keywords.push(new Keyword(element, false, false, true));
        });
        keywords.push(new Keyword(this.Distributor, false, false, true));

        return keywords;
    }

    getIconName(): string {
        return this.Medium[0];
    }

}
