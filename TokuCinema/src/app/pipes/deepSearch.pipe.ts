import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepSearch' })
export class DeepSearch implements PipeTransform {
  public transform(value, args) {
    let worthSearching = (args !== undefined && args.length > 1 && value);

    if (worthSearching) {
        let cleanSearchTerm = args.toLowerCase().trim().replace(/\W/g, '');
        let results = new Array<any>();

        // create search strings - deliminited by space
        let substrings = args.split(" ");
        let cleanedSubStrings = new Array<string>();
        substrings.forEach(element => {
          if (element !== '' || element !== ' ') {
            cleanedSubStrings.push(element.trim().replace(/\W/g, ''));
          }
        });

        // exact match pass
        value.forEach(element => {
          element.names.forEach(nameElement => {
            if (nameElement.exactMatch) {
              let itAlreadExists: boolean = false;

              let resultToAdd = {
                name: element.name,
                names: element.names,
                path: element.path,
                score: 1000,
                iconName: element.iconName
              };

              results.forEach(element => {
                itAlreadExists = element.path === resultToAdd.path;
              });

              if (!itAlreadExists && cleanSearchTerm === nameElement.word) {
                results.push(resultToAdd);
              }
            }
          });
        });

        // weight commonality of keyword
        let words = new Array<string>();
        let counts = new Array<number>();
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
            value.forEach(resultElement => {
              resultElement.names.forEach(resultNameElement => {
                if (!resultNameElement.exactMatch && searchElement.toLowerCase() === resultNameElement.word.toLowerCase()) {

                  // create a result element with appropriate score
                  let resultToAdd = {
                    name: resultElement.name,
                    names: resultElement.names,
                    path: resultElement.path,
                    score: resultNameElement.score,
                    iconName: resultElement.iconName
                  };

                  // add result to list if not already there - add to score if already there
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
        });

        // sort results by score
        results.sort(function(a, b){return a.score - b.score});
        results.reverse();

        // return list
        // return deep search, if no results return standard search
        return (results.length > 0)? results : this.standardSearch(value, cleanSearchTerm);
    }
    else {
      return null;
    }
  }

  standardSearch(value, args) {
    return value.filter( item => (item.name.toLowerCase().indexOf(args.toLowerCase()) >= 0));
  }
}
