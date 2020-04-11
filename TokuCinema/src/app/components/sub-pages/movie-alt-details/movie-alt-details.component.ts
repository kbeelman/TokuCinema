import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-alt-details',
  templateUrl: './movie-alt-details.component.html'
})
export class MovieAltDetailsComponent implements OnInit {
  public activeAltCountry: any; // used for mobile alt version selector

  @Input() movieAlternateVersion: MovieAlternateVersion;

  constructor(
  ) { }

  ngOnInit() {
  }

  toggleCountries(country: string) {
    this.movieAlternateVersion.Countries.forEach(element => {
      if (element.Country === country) {
        element.Active = true;
      } else {
        element.Active = false;
      }
    });
  }

  isCircaDate(releaseDate: string): boolean {
    let response: boolean = false;
    if (isNaN(Number(releaseDate.substr(0, 4)))) {
      response = true;
    }

    return response;
  }

}
