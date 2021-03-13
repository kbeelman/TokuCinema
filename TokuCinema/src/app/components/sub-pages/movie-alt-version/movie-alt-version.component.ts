import { Version } from '../../../domain/Version';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-alt-version',
  templateUrl: './movie-alt-version.component.html'
})
export class MovieAltVersionComponent  {

  @Input() version: Version;
  @Input() numVersions: number = 0;

  constructor(
  ) { }

  isCircaDate(releaseDate: string): boolean {
    let response: boolean = false;
    if (isNaN(Number(releaseDate.substr(0, 4)))) {
      response = true;
    }

    return response;
  }
}
