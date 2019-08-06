import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseYearSort'
})
export class ReleaseYearSortPipe implements PipeTransform {

  transform(items: Array<any>, isMedia: boolean): any {

    // Sort by first movie's release year if media
    if (isMedia) {
      items = items.sort((a, b) => {
        if ((a.Movies[0] !== undefined) && (b.Movies[0] !== undefined)) {
          return a.Movies[0]['ReleaseYear'] - b.Movies[0]['ReleaseYear']
        }
      });
    // Sort by the release year of the array item if it's a movie
    } else {
      items = items.sort((a, b) => {
        return a['ReleaseYear'] - b['ReleaseYear']
      });
    }

    return items;
  }

}
