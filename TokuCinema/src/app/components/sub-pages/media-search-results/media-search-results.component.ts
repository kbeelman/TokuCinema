import { MediaFilterPakage } from '../../../domain/MediaFilterPackage';
import { Component, Input, OnChanges } from '@angular/core';
import { Media } from '../../../domain/Media';

@Component({
  selector: 'app-media-search-results',
  templateUrl: './media-search-results.component.html'
})
export class MediaSearchResultsComponent implements OnChanges {
  @Input() mediaItems: Array<Media> = [];
  @Input() searchTerm: string = '';
  @Input() mediumFilter: string = '';
  @Input() spokenLanguageFilter: string = '';
  @Input() subtitleLanguageFilter: string = '';
  @Input() countryFilter: string = '';
  @Input() regionFilter: string = '';
  @Input() countriesToIterate: Array<string> = [];
  mediaFilters: MediaFilterPakage;

  constructor() {
    this.mediaFilters = this.getMediaFiltersPackage();
  }

  ngOnChanges() {
    this.mediaFilters = this.getMediaFiltersPackage();
  }

  private getMediaFiltersPackage(): MediaFilterPakage {
    return new MediaFilterPakage(
      this.mediumFilter,
      this.spokenLanguageFilter,
      this.subtitleLanguageFilter,
      this.countryFilter,
      this.regionFilter
    );
  }

}
