import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mediaTitle' })
export class MediaTitleSearch implements PipeTransform {
  transform(value, args) {
    if (args !== undefined && args !== '') {
      return value.filter( item => item.Title.toLowerCase().includes(args.toLowerCase()));
    }
    else {
      return value;
    }
  }
}
