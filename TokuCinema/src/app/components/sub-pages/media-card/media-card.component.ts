import { Component, Input } from '@angular/core';
import { Media } from '../../../domain/Media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html'
})
export class MediaCardComponent {
  @Input() media: Media;

  constructor() { }

}
