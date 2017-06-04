import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'movieTitle' })
export class MovieTitleSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      return value.filter( item => item.OfficialTitle.toLowerCase().includes(args.toLowerCase()));
    }
    else {
      return value;
    }
  }
}
