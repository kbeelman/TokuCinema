import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class MediaDetails {
    hasDifferentAspectRatios: boolean = false;
    hasDifferentColors: boolean = false;
    constructor(
        // Main Feature Info
        public Title: string,
        public AspectRatio: Array<{'Version': string, 'AspectRatio': string}>,
        public Runtime: Array<{'Version': string, 'Runtime': number}>,
        public Color: Array<{'Version': string, 'Color': string}>,
        public ChapterStops: Array<{'Version': string, 'Count': number}>,
        public AudioTracksDetails: Array<string>,
        public SubtitlesDetails: Array<string>,
        // Medium Information
        public Medium: Array<string>,
        public Format: Array<{'Medium': string, 'Format': number}>,
        public Region: Array<{'Medium': string, 'Region': string}>,
        public Country: string,
        public MediumCount: Array<{'Medium': string, 'Count': number}>,
        public ColorSystem: string,
        // Distribution Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDate: Date,
        public CircaRelease: string,
        public ReleaseYear: number,
        public PurchaseLinks: Array<{'Vendor': string, 'Link': string}>,
        public MovieDetails: Array<string>,
        public OriginalRelease: string,
        public BoxArt: Array<string>,
        public ScreencapDescriptions: Array<string>
    ) {
        const aspectCompArray: Array<string> = [];
        this.AspectRatio.forEach(element => {
            if (!(aspectCompArray.indexOf(element.AspectRatio) >= 0)) {
                aspectCompArray.push(element.AspectRatio);
            }
        });
        if (aspectCompArray.length > 1) {
            this.hasDifferentAspectRatios = true;
        }

        const colorCompArray: Array<string> = [];
        this.Color.forEach(element => {
            if (!(colorCompArray.indexOf(element.Color) >= 0)) {
                colorCompArray.push(element.Color);
            }
        });
        if (colorCompArray.length > 1) {
            this.hasDifferentColors = true;
        }
    }

    public doesAspectRatioExist(): boolean {
        if (typeof this.AspectRatio !== 'undefined') {
            if (this.AspectRatio.length > 0) {
                return true;
            }
        }
        return false;
    }

    public getHasDifferentAspectRatios(): boolean {
        return this.hasDifferentAspectRatios;
    }

    public doesColorExist(): boolean {
        if (typeof this.Color !== 'undefined') {
            if (this.Color.length > 0) {
                return true;
            }
        }
        return false;
    }

    public getHasDifferentColors(): boolean {
        return this.hasDifferentColors;
    }

    public doesRuntimeExist(): boolean {
        if (typeof this.Runtime !== 'undefined') {
            if (this.Runtime.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesMediumExist(): boolean {
        if (typeof this.Medium !== 'undefined') {
            if (this.Medium.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesFormatExist(): boolean {
        if (typeof this.Format !== 'undefined') {
            if (this.Format.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesMediumCountExist(): boolean {
        if (typeof this.MediumCount !== 'undefined') {
            if (this.MediumCount.length > 0) {
                return true;
            }
        }
        return false;
    }

    public doesRegionExist(): boolean {
        if (typeof this.Region !== 'undefined') {
            if (this.Region.length > 0) {
                return true;
            }
        }
        return false;
    }

    public getFirstMedium(): string {
      return this.Medium && this.Medium.length >= 1 ? this.Medium[0] : '';
    }
}
