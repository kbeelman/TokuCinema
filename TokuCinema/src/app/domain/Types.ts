import { Keyword } from './Keyword';

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
    ) { }
}
