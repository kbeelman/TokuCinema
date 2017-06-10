import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepSearch' })
export class DeepSearch implements PipeTransform {
  transform(value, args) {

    if (args !== undefined && args !== '') {
        let results = new Array<any>();

        // create search strings - deliminited by space
        let substrings = args.split(" ");

        // add results for each string to list
        substrings.forEach(element => {
            let Itemresults = value.filter(item => item.name.toLowerCase().includes(element.toLowerCase()));
            Itemresults.forEach(element => {
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
