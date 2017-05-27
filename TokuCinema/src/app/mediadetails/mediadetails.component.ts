import { Component, OnInit } from '@angular/core';
import { MediaDetails } from '../../domain/MediaDetails';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnInit {
    movie: MediaDetails = new MediaDetails("Godzilla",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"]);

  constructor() { }

  ngOnInit() {
  }

}
