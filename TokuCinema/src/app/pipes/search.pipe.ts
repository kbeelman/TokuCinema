import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class Search implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      return value.filter( item => (item.name.toLowerCase().indexOf(args.toLowerCase()) >= 0));
    }
    else {
      return value;
    }
  }
}
