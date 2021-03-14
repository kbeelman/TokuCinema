import { VideoScreencap } from './Types';
import { Version } from './Version';

export class Country {
    Country: string;
    Videos: Array<VideoScreencap>;
    ScreencapDescriptions: Array<string>;
    Active: boolean;
    Versions: Array<Version>;
}
