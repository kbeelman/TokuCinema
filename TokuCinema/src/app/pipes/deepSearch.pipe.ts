import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deepSearch' })
export class DeepSearch implements PipeTransform {
  public transform(value, args) {
    const worthSearching = (args !== undefined && args.trim().length > 1 && value);

    if (worthSearching) {
        const cleanSearchTerm = args.toLowerCase().trim().replace(/\W/g, '');
        const results = new Array<any>();

        // create search strings - deliminited by space
        const substrings = args.split(' ');
        const cleanedSubStrings = new Array<string>();
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

              const resultToAdd = {
                name: element.name,
                names: element.names,
                path: element.path,
                score: 1000,
                iconName: element.iconName
              };

              results.forEach(subElement => {
                itAlreadExists = subElement.path === resultToAdd.path;
              });

              if (!itAlreadExists && cleanSearchTerm === nameElement.word) {
                results.push(resultToAdd);
              }
            }
          });
        });

        // weight commonality of keyword
        const words = new Array<string>();
        const counts = new Array<number>();
        value.forEach(elementToAudit => {
          elementToAudit.names.forEach(subElement => {
            const indexOfElement = words.indexOf(subElement.word);
            if (!(indexOfElement >= 0)) {
              words.push(subElement.word);
              counts.push(1);
            } else {
              counts[indexOfElement] += 1;
            }
          });
        });

        // apply weightings at name level
        value.forEach(elementToWeight => {
          elementToWeight.names.forEach(subElement => {
            const indexOfElement = words.indexOf(subElement.word);
            if (indexOfElement >= 0) {
              subElement.score = subElement.score / counts[indexOfElement];
            }
          });
        });

        // add results for each string to list
        cleanedSubStrings.forEach(searchElement => {
            value.forEach(resultElement => {
              resultElement.names.forEach(resultNameElement => {

                if (!resultNameElement.exactMatch && searchElement.toLowerCase() === resultNameElement.word.toLowerCase()) {

                  // create a result element with appropriate score
                  const resultToAdd = {
                    name: resultElement.name,
                    names: resultElement.names,
                    path: resultElement.path,
                    score: resultNameElement.score,
                    iconName: resultElement.iconName
                  };

                  // add result to list if not already there - add to score if already there
                  let alreadyExists: boolean = false;
                  results.forEach(subElement => {
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

  standardSearch(value, args) {
    return value.filter( item => (item.name.toLowerCase().indexOf(args.toLowerCase()) >= 0));
  }
}
