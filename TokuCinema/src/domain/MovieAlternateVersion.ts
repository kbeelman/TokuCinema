export class MovieAlternateVersion {
    constructor(
        public Path: string,
        public Countries: Array<
            {
                "Country":string,
                "Active": boolean,
                "Versions":Array<
                    {
                        "MainTitle":Array<{"TitleType":string,"TitleValue":string}>,
                        "Cast":Array<{"ActorName": string, "RoleName": string}>,
                        "DubCast":Array<{"ActorName": string, "RoleName": string}>,
                        "Crew":Array<{"PositionTitle":string,"Name":string}>,
                        "DubCompany":string,
                        "ProductionCompany":string,
                        "DistributionCompany":string,
                        "ReleaseDateString":string,
                        "Runtime":string,
                        "Rating":Array<{"RatingSystem":string,"RatingValue":string}>,
                        "Iterations":Array<{
                            "AlternateTitle":Array<{"TitleType":string,"TitleValue":string}>,
                            "Name":string,
                            "MediaPath":Array<{"Descriptor":string,"Path":string}>,
                            "Runtime":string,
                            "ReleaseDateString":string,
                            "Notes":Array<string>
                        }>
                    }>
            }>
    ) {
        Countries.forEach(country => {
            country.Active = false;
        });
    }
}