import { Medium, Language, Country } from './Types';

// More of a struct
export class MediaFilterPakage {
    public Medium: string;
    public SpokenLanguage: string;
    public SubtitleLanguage: string;
    public Country: string;
    public Region: any;

    constructor(medium?: string,
        region?: any
    ) {
        this.Medium = medium && medium.length ? medium : '';
        this.Region = region ? region : '';
    }
}