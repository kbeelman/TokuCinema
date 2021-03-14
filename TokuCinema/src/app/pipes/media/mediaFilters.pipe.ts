/* eslint sonarjs/cognitive-complexity: 0 */
import { Media } from '../../domain/Media';
import { MediumRegion } from '../../domain/Types';
import { MediaFilterPakage } from '../../domain/MediaFilterPackage';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaFilters' })
export class MediaFiltersSearch implements PipeTransform {
  transform(value: Media[], args: MediaFilterPakage) {
    if (args !== undefined) {
      // Filter for Country
      let filteredResults = value.filter( (item: Media) => (item.Country.toLowerCase().indexOf(args.Country.toLowerCase()) >= 0));
      // Filter for Region
      if (args.Region !== '') {
        filteredResults = filteredResults.filter( (item: Media) => {
            let result: boolean = false;
            if (item.Region !== undefined) {
              (item.Region.forEach((element: MediumRegion) => {
                if (element.Region.indexOf(args.Region) >= 0) {
                  result = true;
                }
              }));
            }
            return result;
          }
        );
      }
      // Filter for Medium
      if (args.Medium !== '') {
        filteredResults = filteredResults.filter( (item: Media) => (item.Medium.indexOf(args.Medium) >= 0));
      }
      // Filter for Spoken language
      if (args.SpokenLanguages !== '') {
        filteredResults = filteredResults.filter( (item: Media) => (item.AudioTracks.indexOf(args.SpokenLanguages) >= 0));
      }
      // Filter for Subtitle language
      if (args.SubtitleLanguages !== '') {
        filteredResults = filteredResults.filter( (item: Media) => (item.Subtitles.indexOf(args.SubtitleLanguages) >= 0));
      }

      return filteredResults;
    } else {
      return value;
    }
  }
}
