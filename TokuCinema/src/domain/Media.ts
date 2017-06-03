import { StringCleaner, StringType } from './StringCleaner';
import { AspectRatio, ColorSystem, ColorType, Language, Medium, Format } from './Types';
import { MediaDetails } from './MediaDetails';
import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class Media implements ISearchable{

    constructor(
        // Main Feature Info
        public Title: string,
        public JapaneseTitle: string,
        public AspectRatio: AspectRatio,
        public Runtime: number,
        public Color: ColorType,
        public OriginalRuntime: number,
        public ChapterStops: Array<{"Version": string, "Count": number}>,
        public Subtitles: Array<Language>,
        // Disc Information
        public Medium: Medium,
        public Format: Format,
        public Region: number,
        public DiskCount: number,
        public ColorSystem: ColorSystem,
        // Distributor Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDate: Date,
        public PurchaseLinks: Array<string>,
        public BoxArt: string,
        public Path?: string
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
        let mediaDetails = new MediaDetails(this.Medium.toString(), this.Title, this.JapaneseTitle,
            [
                this.AspectRatio.toString(), this.toString(), this.Color.toString(),
                this.OriginalRuntime.toString(), 
                '', // Chapter stops go here
                this.Subtitles.toString()
            ],
            [
                this.Medium.toString(), this.Format.toString(), this.Region.toString(), 
                this.DiskCount.toString(), this.ColorSystem.toString()
            ],
            [this.Distributor, this.CatalogCode, this.UPC, this.ReleaseDate.toString()],
            []
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
}
