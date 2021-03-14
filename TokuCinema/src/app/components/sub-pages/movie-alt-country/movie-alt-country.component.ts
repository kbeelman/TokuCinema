import { Country } from '../../../domain/Country';
import { ImageScreencap } from '../../../domain/Types';

import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-movie-alt-country',
  templateUrl: './movie-alt-country.component.html'
})
export class MovieAltCountryComponent implements OnInit {
  @Input() country: Country = new Country();
  @Input() path: string = '';

  imageGallery: Array<ImageScreencap> = [];

  constructor(
    private fdb: FirebaseService
  ) { }

  ngOnInit() {
    this.imageGallery = this.fdb.getImages('alternateVersions', this.path + '/' + this.country.Country, this.country.ScreencapDescriptions);
  }

  getNumberOfImages(): number {
    if (this.country.ScreencapDescriptions) {
      return this.country.ScreencapDescriptions.length;
    } else {
      return 0;
    }
  }

}
