import { MediaTitleSearch } from '../pipes/media/mediaTitle.pipe';
import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../domain/Media';

@Component({
  selector: 'app-media-search-results',
  templateUrl: './media-search-results.component.html'
})
export class MediaSearchResultsComponent implements OnInit {
  @Input() mediaItems: Array<Media>;
  @Input() searchTerm: string;

  constructor() { }

  ngOnInit() {
  }

}
