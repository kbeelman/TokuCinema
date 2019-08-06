// More of a struct
export class MovieFilterPackage {
    public SpokenLanguage: string;
    public Distributor: string;
    public Director: string;
    public Series: string;
    public Era: string;
    public ProductionCompany: string;

    constructor(
        spokenLanguage?: string,
        distributor?: string,
        director?: string,
        series?: string,
        era?: string,
        productionCompany?: string
    ) {
        this.SpokenLanguage = spokenLanguage && spokenLanguage.length ? spokenLanguage : '';
        this.Distributor = distributor && distributor.length ? distributor : '';
        this.Director = director && director.length ? director : '';
        this.Series = series && series.length ? series : '';
        this.Era = era && era.length ? era : '';
        this.ProductionCompany = productionCompany && productionCompany.length ? productionCompany : '';
    }
}
