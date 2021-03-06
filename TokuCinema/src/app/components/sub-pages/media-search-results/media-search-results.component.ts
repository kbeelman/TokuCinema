import { MediaFilterPakage } from '../../../domain/MediaFilterPackage';
import { Component, Input, OnChanges } from '@angular/core';
import { Media } from '../../../domain/Media';

@Component({
  selector: 'app-media-search-results',
  templateUrl: './media-search-results.component.html'
})
export class MediaSearchResultsComponent implements OnChanges {
  @Input() mediaItems: Array<Media>;
  @Input() searchTerm: string;
  @Input() mediumFilter: string;
  @Input() spokenLanguageFilter: string;
  @Input() subtitleLanguageFilter: string;
  @Input() countryFilter: string;
  @Input() regionFilter: number;
  @Input() countriesToIterate: Array<string>;
  mediaFilters: MediaFilterPakage;

  constructor() {
  }

  ngOnChanges() {
    this.mediaFilters = new MediaFilterPakage(
      this.mediumFilter,
      this.spokenLanguageFilter,
      this.subtitleLanguageFilter,
      this.countryFilter,
      this.regionFilter
    );
  }

}
