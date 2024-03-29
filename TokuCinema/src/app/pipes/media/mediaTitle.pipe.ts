import { Media } from '../../domain/Media';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaTitle' })
export class MediaTitleSearch implements PipeTransform {
  transform(value: Media[], args: string) {
    if (args && this.getCleanString(args).length >= 3) {
        const results: Array<Media> = new Array<Media>();

        // create search strings - deliminited by space
        const substrings: string[] = args.split(' ');

        const cleanedSubStrings: Array<string> = new Array<string>();

        // remove empty elements
        substrings.forEach((element: string) => {
          if (element !== '') {
            cleanedSubStrings.push(this.getCleanString(element));
          }
        });

        // add results for each string to list
        cleanedSubStrings.forEach((element: string) => {
            const Itemresults: Media[] =
              value.filter((item: Media) => (this.getCleanString(item.Title).indexOf(element.toLowerCase()) >= 0));
            Itemresults.forEach((subElement: Media) => {
              if (results.indexOf(subElement) < 0) {
                results.push(subElement);
              }
            });
        });

        // return list
        return results;
    } else {
      return value;
    }
  }

  private getCleanString(stringToClean: string): string {
    if (stringToClean && stringToClean.length) {
      return stringToClean.toLowerCase().trim().replace(/\W/g, '');
    } else {
      return '';
    }
  }

}
