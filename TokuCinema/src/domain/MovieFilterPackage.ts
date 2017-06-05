// More of a struct
export class MovieFilterPackage {
    public SpokenLanguage: string;
    public Distributor: string;
    public Director: string;
    public Series: string;
    public Era: string;
    public ProductionCompany: string;

    constructor(
        distributor?: string,
        director?: string,
        series?: string,
        era?: string,
        productionCompany?: string,
        spokenLanguage?: string
    ) {
        this.SpokenLanguage = spokenLanguage;
        this.Distributor = distributor;
        this.Director = director;
        this.Series = series;
        this.Era = era;
        this.ProductionCompany = productionCompany;
    }
}