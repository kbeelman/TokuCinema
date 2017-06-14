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

        // exact match pass
        if (value) {
          value.forEach(element => {
            element.names.forEach(nameElement => {
              if (nameElement.exactMatch && args.toLowerCase() === nameElement.word.toLowerCase()) {
                results.push(
                  {
                      name: element.name,
                      names: element.names,
                      path: element.path,
                      score: 1000
                  }
                )
              }
            });
          });
        }

        // add results for each string to list
        cleanedSubStrings.forEach(searchElement => {
            if (value) {
              value.forEach(resultElement => {
                resultElement.names.forEach(resultNameElement => {
                  if (!resultNameElement.exactMatch && searchElement.toLowerCase() === resultNameElement.word.toLowerCase()) {

                    // create a result element with appropriate score
                    let resultToAdd = {
                      name: resultElement.name,
                      names: resultElement.names,
                      path: resultElement.path,
                      score: resultNameElement.score
                    };

                    // add result to list if not already there - replace if already there
                    let alreadyExists: boolean = false;
                    results.forEach(element => {
                      if (element.path === resultToAdd.path) {
                        alreadyExists = true;
                      }
                    });

                    if (!alreadyExists) {
                      results.push(resultToAdd);
                    }
                  }
                });
              });
            }
        });

        // sort results by score
        results.sort(function(a, b){return a.score - b.score});
        results.reverse();

        // return list
        console.log(results);
        return results;
    }
    else {
      return value;
    }
  }
}
