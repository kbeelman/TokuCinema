import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class MediaDetails {
    constructor(
        // Main Feature Info
        public Title: string,
        public AspectRatio: Array<{"Version": string, "AspectRatio": string}>,
        public Runtime: Array<{"Version": string, "Runtime": number}>,
        public Color: Array<{"Version": string, "Color": string}>,
        public ChapterStops: Array<{"Version": string, "Count": number}>,
        public AudioTracksDetails: Array<string>,
        public SubtitlesDetails: Array<string>,
        // Medium Information
        public Medium: Array<string>,
        public Format: Array<{"Medium": string, "Format": number}>,
        public Region: string,
        public Country: string,
        public MediumCount: Array<{"Medium": string, "Count": number}>,
        public ColorSystem: string,
        // Distribution Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDate: Date,
        public PurchaseLinks: Array<{"Vendor": string, "Link": string}>,
        public MovieDetails: Array<string>,
        public OriginalRelease: string,
        public BoxArt: string,
        public Screencaps: Array<string>
    ) {}

}
