import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../../domain/Media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html'
})
export class MediaCardComponent implements OnInit {
  @Input() media: Media;

  constructor() { }

  ngOnInit() {
  }

}
