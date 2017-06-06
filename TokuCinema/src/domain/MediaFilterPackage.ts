// More of a struct
export class MediaFilterPakage {
    public Medium: string;
    public SpokenLanguages: string;
    public SubtitleLanguages: string;
    public Country: string;
    public Region: any;

    constructor(medium?: string,
        spokenLanguages?: string,
        subtitleLanguages?: string,
        country?: string,
        region?: any
    ) {
        this.Medium = medium && medium.length ? medium : '';
        this.SpokenLanguages = spokenLanguages && spokenLanguages.length ? spokenLanguages : '';
        this.SubtitleLanguages = subtitleLanguages && subtitleLanguages.length ? subtitleLanguages : '';
        this.Country = country && country.length ? country : '';
        this.Region = region ? region : '';
    }
}