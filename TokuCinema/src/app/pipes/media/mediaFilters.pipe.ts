import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaFilters' })
export class MediaFiltersSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      // Filter for Region
      let filteredResults = value.filter( item => (item.Region.toLowerCase().indexOf(args.Region.toLowerCase()) >= 0));
      // Filter for Medium
      if (args.Medium != '') {
        filteredResults = filteredResults.filter( item => (item.Medium.indexOf(args.Medium) >= 0));
      }
      // Filter for Spoken language
      if (args.SpokenLanguages != '') {
        filteredResults = filteredResults.filter( item => (item.AudioTracks.indexOf(args.SpokenLanguages) >= 0));
      }
      // Filter for Subtitle language
      if (args.SubtitleLanguages != '') {
        filteredResults = filteredResults.filter( item => (item.Subtitles.indexOf(args.SubtitleLanguages) >= 0));
      }
      // Filter for Country
      filteredResults = filteredResults.filter( item => (item.Country.toLowerCase().indexOf(args.Country.toLowerCase()) >= 0));
      

      return filteredResults;
    }
    else {
      return value;
    }
  }
}
