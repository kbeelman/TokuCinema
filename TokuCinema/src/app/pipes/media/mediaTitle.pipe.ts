import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaTitle' })
export class MediaTitleSearch implements PipeTransform {
  transform(value, args) {
    if (args && this.getCleanString(args).length >= 3) {
        const results = new Array<any>();

        // create search strings - deliminited by space
        const substrings = args.split(' ');

        const cleanedSubStrings = new Array<string>();

        // remove empty elements
        substrings.forEach(element => {
          if (element !== '') {
            cleanedSubStrings.push(this.getCleanString(element));
          }
        });

        // add results for each string to list
        cleanedSubStrings.forEach(element => {
            const Itemresults = value.filter(item => (this.getCleanString(item.Title).indexOf(element.toLowerCase()) >= 0));
            Itemresults.forEach(subElement => {
              if (!(results.indexOf(subElement) >= 0)) {
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
