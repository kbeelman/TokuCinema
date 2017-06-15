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
          if (element !== '' || element !== ' ') {
            cleanedSubStrings.push(element.trim().replace(/\W/g, ''));
          }
        });

        // exact match pass
        if (value) {
          value.forEach(element => {
            element.names.forEach(nameElement => {
              let itAlreadExists: boolean = false;

              let resultToAdd = {
                name: element.name,
                names: element.names,
                path: element.path,
                score: 1000
              };

              results.forEach(element => {
                itAlreadExists = element.path === resultToAdd.path;
              });

              if (!itAlreadExists && nameElement.exactMatch && args.toLowerCase().trim().replace(/\W/g, '') === nameElement.word.toLowerCase()) {
                results.push(resultToAdd);
              }
            });
          });
        }

        // weight commonality of keyword
        let words: Array<string> = [];
        let counts: Array<number> = [];
        value.forEach(elementToAudit => {
          elementToAudit.names.forEach(element => {
            let indexOfElement = words.indexOf(element.word);
            if (!(indexOfElement >= 0)) {
              words.push(element.word);
              counts.push(1);
            } else {
              counts[indexOfElement] += 1;
            }
          });
        });

        // apply weightings at name level
        value.forEach(elementToWeight => {
          elementToWeight.names.forEach(element => {
            let indexOfElement = words.indexOf(element.word);
            if (indexOfElement >= 0) {
              element.score = element.score / counts[indexOfElement];
            }
          });
        });

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
                        element.score += resultToAdd.score;
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
