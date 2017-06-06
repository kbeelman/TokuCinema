import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'movieFilters' })
export class MovieFiltersSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      // Filter for Distributor
      let filteredResults = value.filter( item => item.Distributor.toLowerCase().includes(args.Distributor.toLowerCase()));
      // Filter for Spoken Language
      if (args.SpokenLanguage != '') {
        filteredResults = filteredResults.filter( item => item.Languages.includes(args.SpokenLanguage));
      }
      // Filter for Director
      filteredResults = filteredResults.filter( item => item.Director.toLowerCase().includes(args.Director.toLowerCase()));
      // Filter for Series
      filteredResults = filteredResults.filter( item => item.Series.toLowerCase().includes(args.Series.toLowerCase()));
      // Filter for Era
      filteredResults = filteredResults.filter( item => item.Era.toLowerCase().includes(args.Era.toLowerCase()));
      // Filter for Production Company
      filteredResults = filteredResults.filter( item => item.ProductionCompany.toLowerCase().includes(args.ProductionCompany.toLowerCase()));
      
      return filteredResults;
    }
    else {
      return value;
    }
  }
}
