import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'movieTitle' })
export class MovieTitleSearch implements PipeTransform {
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

        // Official titles
        // add results for each string to list
        cleanedSubStrings.forEach(element => {
            const titleResults = value.filter(item => (this.getCleanString(item.OfficialTitle).indexOf(element) >= 0));
            titleResults.forEach(subElement => {
              if (!(results.indexOf(subElement) >= 0)) {
                results.push(subElement);
              }
            });
        });

        // Alt titles
        // add results for each string to list
        cleanedSubStrings.forEach(element => {
          if (element !== 'the') {
            value.forEach(movie => {
              if (movie.AlternateTitles && movie.AlternateTitles.length) {
                movie.AlternateTitles.forEach(altTitle => {
                  if (this.getCleanString(altTitle.TitleValue) &&
                      this.getCleanString(altTitle.TitleValue).indexOf(element) >= 0 &&
                      !(results.indexOf(movie) >= 0)) {
                    results.push(movie);
                  }
                });
              }
            });
          }
        });

        // years
        // add results for each string to list
        cleanedSubStrings.forEach(element => {
          value.forEach(movie => {
            if (movie.ReleaseYear &&
                movie.ReleaseYear.toString().indexOf(element) >= 0 &&
                !(results.indexOf(movie) >= 0)) {
                  results.push(movie);
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
