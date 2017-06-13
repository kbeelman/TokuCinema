import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepSearch' })
export class DeepSearch implements PipeTransform {
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
            let Itemresults = value.filter(item => (item.name.toLowerCase().indexOf(element.toLowerCase()) >= 0));
            Itemresults.forEach(element => {
              if(!(results.indexOf(element) >= 0)) {
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
