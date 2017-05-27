import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class Search implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      return value.filter( item => item.name.toLowerCase().includes(args.toLowerCase()));
    }
    else {
      return value;
    }
  }
}
