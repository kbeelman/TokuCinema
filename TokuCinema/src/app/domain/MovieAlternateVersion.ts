import { Country } from './Country';

export class MovieAlternateVersion {
    constructor(
        public Path: string,
        public Countries: Array<Country>
    ) {
        Countries.forEach(country => {
            country.Active = false;
        });
    }
}
