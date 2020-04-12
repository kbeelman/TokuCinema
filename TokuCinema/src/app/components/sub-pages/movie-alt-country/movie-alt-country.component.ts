import { Country } from '../../../domain/Country';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-alt-country',
  templateUrl: './movie-alt-country.component.html'
})
export class MovieAltCountryComponent {
  public activeAltCountry: any; // used for mobile alt version selector

  @Input() country: Country;

  constructor(
  ) { }

}
