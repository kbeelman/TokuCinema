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
    TitleType: string;
    TitleValue: string;
}

export class Actor {
    ActorName: string;
    RoleName: string;
}

export class CrewMember {
    PositionTitle: string;
    Name: string;
}

export class DeepSearchObject {
    name: string;
    names: Array<Keyword>;
    type: string;
    path: string;
    score: number;
    iconName: string;
}
