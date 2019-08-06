import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaFilters' })
export class MediaFiltersSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      // Filter for Country
      let filteredResults = value.filter( item => (item.Country.toLowerCase().indexOf(args.Country.toLowerCase()) >= 0));
      // Filter for Region
      if (args.Region !== '') {
        filteredResults = filteredResults.filter( item => {
            let result: boolean = false;
            if (item.Region !== undefined) {
              (item.Region.forEach(element => {
                if (element.Region.indexOf(args.Region) >= 0) {
                  result = true;
                }
              }))
            }
            return result;
          }
        )
      }
      // Filter for Medium
      if (args.Medium !== '') {
        filteredResults = filteredResults.filter( item => (item.Medium.indexOf(args.Medium) >= 0));
      }
      // Filter for Spoken language
      if (args.SpokenLanguages !== '') {
        filteredResults = filteredResults.filter( item => (item.AudioTracks.indexOf(args.SpokenLanguages) >= 0));
      }
      // Filter for Subtitle language
      if (args.SubtitleLanguages !== '') {
        filteredResults = filteredResults.filter( item => (item.Subtitles.indexOf(args.SubtitleLanguages) >= 0));
      }

      return filteredResults;
    } else {
      return value;
    }
  }
}
