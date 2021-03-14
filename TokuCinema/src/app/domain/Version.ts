import { Actor, CrewMember, Title, VersionIteration, VersionRating } from './Types';

export class Version {
    MainTitle: Array<Title>;
    Cast: Array<Actor>;
    DubCast: Array<Actor>;
    Crew: Array<CrewMember>;
    DubCompany: string;
    ProductionCompany: string;
    DistributionCompany: string;
    ReleaseDate: string;
    Runtime: string;
    Rating: Array<VersionRating>;
    Iterations: Array<VersionIteration>;
}

