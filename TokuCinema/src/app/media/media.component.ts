import { Component, OnInit } from '@angular/core';
// import { MediaDetails } from '../../domain/MediaDetails';
import { Media } from '../../domain/Media';
import { stubMedia } from '../../assets/data/stubData';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  medias: Array<Media> = stubMedia;
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }

}
