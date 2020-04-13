import { Country } from '../../../domain/Country';

import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'app-movie-alt-country',
  templateUrl: './movie-alt-country.component.html'
})
export class MovieAltCountryComponent implements OnInit {
  imageGallery: Array<{'Screencap': string, 'Thumbnail': string, 'Description': string, 'Name': string}>;

  @Input() country: Country;
  @Input() path: string;

  constructor(
    private fdb: FirebaseService
  ) { }

  ngOnInit() {
    this.imageGallery = this.fdb.getImages('alternateVersions', this.path + '/' + this.country.Country, this.country.ScreencapDescriptions);
  }

}
