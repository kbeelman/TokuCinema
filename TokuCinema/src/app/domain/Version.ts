import { Actor, CrewMember, Title } from './Types';

export class Version {
    'MainTitle': Array<Title>;
    'Cast': Array<Actor>;
    'DubCast': Array<Actor>;
    'Crew': Array<CrewMember>;
    'DubCompany': string;
    'ProductionCompany': string;
    'DistributionCompany': string;
    'ReleaseDate': string;
    'Runtime': string;
    'Rating': Array<{'RatingSystem': string; 'RatingValue': string}>;
    'Iterations': Array<{
        'AlternateTitle': Array<Title>;
        'Name': string;
        'MediaPath': Array<{'Descriptor': string; 'Path': string}>;
        'Runtime': string;
        'ReleaseDate': string;
        'Notes': Array<string>;
    }>;
}

