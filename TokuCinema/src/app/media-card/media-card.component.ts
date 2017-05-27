import { Component, OnInit, Input } from '@angular/core';
import { MediaDetails } from '../../domain/MediaDetails';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html'
})
export class MediaCardComponent implements OnInit {
  @Input() media: MediaDetails;

  constructor() { }

  ngOnInit() {
  }

}
