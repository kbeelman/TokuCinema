import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'movieTitle' })
export class MovieTitleSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
        let results = new Array<any>();

        // create search strings - deliminited by space
        let substrings = args.split(" ");

        let cleanedSubStrings = new Array<string>();

        // remove empty elements
        substrings.forEach(element => {
          if (element !== '') {
            cleanedSubStrings.push(element);
          }
        });

        // add results for each string to list
        cleanedSubStrings.forEach(element => {
            let titleResults = value.filter(item => item.OfficialTitle.toLowerCase().includes(element.toLowerCase()));
            titleResults.forEach(element => {
              if(!results.includes(element)) {
                results.push(element);
              }
            });
        });

        // return list
        return results;
    }
    else {
      return value;
    }
  }
}
