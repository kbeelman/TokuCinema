import { Keyword } from './Keyword';

import { Observable } from 'rxjs';

export type AspectRatioType = '4:3' |  '16:9' | '2.35:1' | '2.40:1';

export type ColorType = 'Black & White' | 'Color';

export type LanguageType = 'English' | 'Japanese' | 'German' | 'French' | 'Korean' | '';

export type MediumType = 'DVD' | 'VHS' | 'Blu-Ray';

export type FormatType = 'Single Sided' | 'Dual-Layer';

export type ColorSystemType = 'NTSC';

export type CountryType = 'Japan' | 'UnitedStates';

export type SeriesType = 'Godzilla' | 'Gamera' | 'Universal';

export type EraType = 'Showa' | 'Heisei';

export class Title {
    constructor(
        public TitleType: string,
        public TitleValue: string
    ) {}
}

export class Actor {
    constructor(
        public ActorName: string,
        public RoleName: string
    ) {}
}

export class CrewMember {
    constructor(
        public PositionTitle: string,
        public Name: string
    ) {}
}

export class DeepSearchObject {
    constructor(
        public name: string,
        public names: Array<Keyword>,
        public type: string,
        public path: string,
        public score: number,
        public iconName: string
    ) {}
}

export class Developer {
    constructor(
        public name: string,
        public imgUrl: string,
        public bio: string,
        public url: string
    ) {}
}

export class BranchData {
    constructor(
        public branchName: string,
        public data: Observable<any>
    ) {}
}

export class MenuItems {
    constructor(
        public text: string,
        public link: string,
        public body?: string
    ) {}
}

export class ImageScreencap {
    constructor(
        public Screencap: string,
        public Thumbnail: string,
        public Description: string,
        public Name: string
    ) {}
}

export class VideoScreencap {
    constructor(
        public Host: string,
        public ID: string,
        public Description: string
    ) {}
}

export class ReviewElement {
    constructor(
        public Score: number,
        public Description: number
    ) {}
}

export class VersionAspectRatio {
    constructor(
        public Version: string,
        public AspectRatio: AspectRatioType
    ) {}
}

export class VersionRuntime {
    constructor(
        public Version: string,
        public Runtime: number
    ) {}
}

export class VersionColor {
    constructor(
        public Version: string,
        public Color: string
    ) {}
}

export class VersionChapters {
    constructor(
        public Version: string,
        public Count: number
    ) {}
}

export class VersionRating {
    constructor(
        public RatingSystem: string,
        public RatingValue: string
    ) {}
}

export class VersionIteration {
    constructor(
        public AlternateTitle: Array<Title>,
        public Name: string,
        public MediaPath: Array<{Descriptor: string; Path: string}>,
        public Runtime: string,
        public ReleaseDate: string,
        public Notes: Array<string>,
    ) {}
}

export class MediumFormat {
    constructor(
        public Medium: string,
        public Format: number
    ) {}
}

export class MediumRegion {
    constructor(
        public Medium: string,
        public Region: string
    ) {}
}

export class MediumCount {
    constructor(
        public Medium: string,
        public Count: number
    ) {}
}

export class MediaVendor {
    constructor(
        public Vendor: string,
        public Link: string
    ) {}
}
