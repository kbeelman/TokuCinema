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
        cleanedSubStrings.forEach(searchElement => {
            if (value) {
              value.forEach(resultElement => {
                resultElement.names.forEach(resultNameElement => {
                  if (searchElement.toLowerCase() === resultNameElement.word.toLowerCase()) {
                    if (!(results.indexOf(resultElement) >= 0)) {
                      results.push(resultElement);
                    }
                  }
                });
              });
            }
        });

        // return list
        return results;
    }
    else {
      return value;
    }
  }
}
