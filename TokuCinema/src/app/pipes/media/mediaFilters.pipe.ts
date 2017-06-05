import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaFilters' })
export class MediaFiltersSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      // Filter for Medium
      let filteredResults = value.filter( item => item.Medium.toLowerCase().includes(args.Medium.toLowerCase()));
      // Filter for Spoken language
      // let filteredResults = value.filter( item => item.Medium.toLowerCase().includes(args.Medium.toLowerCase()));
      // Filter for Subtitle language
      // let filteredResults = value.filter( item => item.Medium.toLowerCase().includes(args.Medium.toLowerCase()));
      // Filter for Country
      // filteredResults = filteredResults.filter( item => item.Country.toLowerCase().includes(args.Medium.toLowerCase()));
      
      // Filter for Region
      filteredResults = filteredResults.filter( item => item.Region.toLowerCase().includes(args.Region.toLowerCase()));

      return filteredResults;
    }
    else {
      return value;
    }
  }
}
