export class MovieAlternateVersion {
    constructor(
        public Path: string,
        public Countries: Array<
            {
                "Country":string,
                "Active": boolean,
                "Versions":Array<
                    {
                        "MainTitle":Array<string>,
                        "Cast":Array<string>,
                        "DubCast":Array<string>,
                        "Crew":Array<string>,
                        "DubCompany":string
                        "ProductionCompany":string,
                        "DistributionCompany":string,
                        "ReleaseDate":string,
                        "Runtime":string,
                        "Rating":string,
                        "Iterations":Array<{
                            "AlternateTitle":Array<{"TitleType":string,"TitleValue":string}>,
                            "Name":string,
                            "MediaPath":Array<string>,
                            "Runtime":string,
                            "ReleaseDate":string,
                            "Notes":Array<string>
                        }>
                    }>
            }>
    ) {
        Countries.forEach(element => {
            element.Active = false;
        });
    }
}