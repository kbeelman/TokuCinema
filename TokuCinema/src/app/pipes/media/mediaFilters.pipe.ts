import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaFilters' })
export class MediaFiltersSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      // Filter for Medium
      let filteredResults = value.filter( item => item.Medium.toLowerCase().includes(args.Medium.toLowerCase()));
      // Filter for Spoken language
      if (args.SpokenLanguages != '') {
        filteredResults = filteredResults.filter( item => item.AudioTracks.includes(args.SpokenLanguages));
      }
      // Filter for Subtitle language
      if (args.SubtitleLanguages != '') {
        filteredResults = filteredResults.filter( item => item.Subtitles.includes(args.SubtitleLanguages));
      }
      // Filter for Country
      filteredResults = filteredResults.filter( item => item.Country.toLowerCase().includes(args.Country.toLowerCase()));
      // Filter for Region
      filteredResults = filteredResults.filter( item => item.Region.toLowerCase().includes(args.Region.toLowerCase()));

      return filteredResults;
    }
    else {
      return value;
    }
  }
}
