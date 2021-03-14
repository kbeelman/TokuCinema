/* eslint sonarjs/cognitive-complexity: 0 */
import { Keyword } from '../domain/Keyword';
import { DeepSearchObject } from '../domain/Types';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepSearch' })
export class DeepSearch implements PipeTransform {
  public transform(value: DeepSearchObject[], args: string) {
    const worthSearching = (args !== undefined && args.trim().length > 1 && value);

    if (worthSearching) {
        const cleanSearchTerm: string = args.toLowerCase().trim().replace(/\W/g, '');
        const results: DeepSearchObject[] = [];

        // create search strings - deliminited by space
        const substrings: string[] = args.split(' ');
        const cleanedSubStrings: string[] = new Array<string>();
        substrings.forEach((element: string) => {
          if (element.trim() !== '') {
            cleanedSubStrings.push(element.trim().replace(/\W/g, ''));
          }
        });

        // exact match pass
        value.forEach((element: DeepSearchObject) => {
          element.names.forEach((nameElement: Keyword) => {
            if (nameElement.exactMatch) {
              let itAlreadExists: boolean = false;

              const resultToAdd: DeepSearchObject = {
                name: element.name,
                names: element.names,
                path: element.path,
                score: 1000,
                iconName: element.iconName,
                type: element.type
              };

              results.forEach((subElement: DeepSearchObject) => {
                itAlreadExists = subElement.path === resultToAdd.path;
              });

              if (!itAlreadExists && cleanSearchTerm === nameElement.word) {
                results.push(resultToAdd);
              }
            }
          });
        });

        // weight commonality of keyword
        const words: Array<string> = new Array<string>();
        const counts: Array<number> = new Array<number>();
        value.forEach((elementToAudit: DeepSearchObject) => {
          elementToAudit.names.forEach((subElement: Keyword) => {
            const indexOfElement: number = words.indexOf(subElement.word);
            if (indexOfElement < 0) {
              words.push(subElement.word);
              counts.push(1);
            } else {
              counts[indexOfElement] += 1;
            }
          });
        });

        // apply weightings at name level
        value.forEach((elementToWeight: DeepSearchObject) => {
          elementToWeight.names.forEach((subElement: Keyword) => {
            const indexOfElement: number = words.indexOf(subElement.word);
            if (indexOfElement >= 0) {
              subElement.score = subElement.score / counts[indexOfElement];
            }
          });
        });

        // add results for each string to list
        cleanedSubStrings.forEach((searchElement: string) => {
            value.forEach((resultElement: DeepSearchObject) => {
              resultElement.names.forEach((resultNameElement: Keyword) => {

                if (!resultNameElement.exactMatch && searchElement.toLowerCase() === resultNameElement.word.toLowerCase()) {

                  // create a result element with appropriate score
                  const resultToAdd: DeepSearchObject = {
                    name: resultElement.name,
                    names: resultElement.names,
                    path: resultElement.path,
                    score: resultNameElement.score,
                    iconName: resultElement.iconName,
                    type: resultElement.type
                  };

                  // add result to list if not already there - add to score if already there
                  let alreadyExists: boolean = false;
                  results.forEach((subElement: DeepSearchObject) => {
                    if (subElement.path === resultToAdd.path) {
                      alreadyExists = true;
                      subElement.score += resultToAdd.score;
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
        results.sort((a, b) => a.score - b.score);
        results.reverse();

        // return deep search, if no results return standard search
        return (results.length > 0) ? results : this.standardSearch(value, cleanSearchTerm);
    } else {
      return null;
    }
  }

  standardSearch(value: DeepSearchObject[], args: string) {
    return value.filter( item => (item.name.toLowerCase().indexOf(args.toLowerCase()) >= 0));
  }
}
