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
    if (this.movieAlternateVersion.Countries) {
      this.activeAltCountry = this.movieAlternateVersion.Countries[0].Country;
    }
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
}
