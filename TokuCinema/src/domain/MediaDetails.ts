import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class MediaDetails {
    constructor(
        // Main Feature Info
        public Title: string,
        public OriginalTitle: string,
        public AspectRatio: string,
        public Runtime: number,
        public OriginalRuntime: number,
        public Color: string,
        public ChapterStops: Array<{"Version": string, "Count": number}>,
        public AudioTracksDetails: Array<string>,
        public SubtitlesDetails: Array<string>,
        // Medium Information
        public Medium: string,
        public Format: string,
        public Region: string,
        public Country: string,
        public MediumCount: number,
        public ColorSystem: string,
        // Distribution Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDate: Date,
        public PurchaseLinks: Array<{"Vendor": string, "Link": string}>,
        public MovieDetails: Array<{"OfficialTitle": string, "Path": string}>,
        public BoxArt: string,
        public Screencaps: Array<string>
    ) {}

}
