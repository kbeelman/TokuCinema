import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'movieFilters' })
export class MovieFiltersSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      // Filter for Distributor
      let filteredResults = value.filter( item => (item.Distributor.toLowerCase().indexOf(args.Distributor.toLowerCase()) >= 0));
      // Filter for Spoken Language
      if (args.SpokenLanguage != '') {
        filteredResults = filteredResults.filter( item => (item.Languages.indexOf(args.SpokenLanguage) >= 0));
      }
      // Filter for Director
      filteredResults = filteredResults.filter( item => (item.Director.toLowerCase().indexOf(args.Director.toLowerCase()) >= 0));
      // Filter for Series
      filteredResults = filteredResults.filter( item => (item.Series.toLowerCase().indexOf(args.Series.toLowerCase()) >= 0));
      // Filter for Era
      filteredResults = filteredResults.filter( item => (item.Era.toLowerCase().indexOf(args.Era.toLowerCase()) >= 0));
      // Filter for Production Company
      filteredResults = filteredResults.filter( item => (item.ProductionCompany.toLowerCase().indexOf(args.ProductionCompany.toLowerCase()) >= 0));
      
      return filteredResults;
    }
    else {
      return value;
    }
  }
}
