import { Component, OnInit } from '@angular/core';
import { MediaDetails } from '../../domain/MediaDetails';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  private medias: Array<MediaDetails> = [
    new MediaDetails("Godzilla",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"]),
    new MediaDetails("Godzilla",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"]),
    new MediaDetails("Godzilla",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"])
  ];

  constructor() { }

  ngOnInit() {
  }

}
