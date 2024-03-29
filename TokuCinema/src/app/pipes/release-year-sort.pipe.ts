import { Media } from '../domain/Media';
import { Movie } from '../domain/Movie';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseYearSort'
})
export class ReleaseYearSortPipe implements PipeTransform {

  transform(items: (Movie | Media)[], isMedia: boolean): any {
    // Sort by first movie's release year if media
    if (isMedia) {
      (items as Media[]).sort((a: Media, b: Media) => {
        if ((a.Movies[0] !== undefined) && (b.Movies[0] !== undefined)) {
          return a.Movies[0].ReleaseYear - b.Movies[0].ReleaseYear;
        } else {
          return 0;
        }
      });
    // Sort by the release year of the array item if it's a movie
    } else {
      items.sort((a, b) => a.ReleaseYear - b.ReleaseYear);
    }

    return items;
  }

}
