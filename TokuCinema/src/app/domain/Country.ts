import { Version } from './Version';

export class Country {
    'Country': string;
    'Videos': Array<{'Host': string, 'ID': string, 'Description': string}>;
    'ScreencapDescriptions': Array<string>;
    'Active': boolean;
    'Versions': Array<Version>;
}
