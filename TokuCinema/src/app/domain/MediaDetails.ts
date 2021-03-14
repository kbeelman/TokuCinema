import {
    MediaVendor,
    MediumCount,
    MediumFormat,
    MediumRegion,
    VersionAspectRatio,
    VersionChapters,
    VersionColor,
    VersionRuntime
} from './Types';

export class MediaDetails {
    hasDifferentAspectRatios: boolean = false;
    hasDifferentColors: boolean = false;
    constructor(
        // Main Feature Info
        public Title: string,
        public AspectRatio: Array<VersionAspectRatio>,
        public Runtime: Array<VersionRuntime>,
        public Color: Array<VersionColor>,
        public ChapterStops: Array<VersionChapters>,
        public AudioTracksDetails: Array<string>,
        public SubtitlesDetails: Array<string>,
        // Medium Information
        public Medium: Array<string>,
        public Format: Array<MediumFormat>,
        public Region: Array<MediumRegion>,
        public Country: string,
        public MediumCount: Array<MediumCount>,
        public ColorSystem: string,
        // Distribution Information
        public Distributor: string,
        public CatalogCode: string,
        public UPC: string,
        public ReleaseDate: Date | undefined,
        public CircaRelease: string,
        public ReleaseYear: number,
        public PurchaseLinks: Array<MediaVendor>,
        public MovieDetails: Array<string>,
        public OriginalRelease: string,
        public BoxArt: Array<string>,
        public ScreencapDescriptions: Array<string>
    ) {
        const aspectCompArray: Array<string> = [];
        this.AspectRatio.forEach(element => {
            if (aspectCompArray.indexOf(element.AspectRatio) < 0) {
                aspectCompArray.push(element.AspectRatio);
            }
        });
        if (aspectCompArray.length > 1) {
            this.hasDifferentAspectRatios = true;
        }

        const colorCompArray: Array<string> = [];
        this.Color.forEach(element => {
            if (colorCompArray.indexOf(element.Color) < 0) {
                colorCompArray.push(element.Color);
            }
        });
        if (colorCompArray.length > 1) {
            this.hasDifferentColors = true;
        }
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
}
