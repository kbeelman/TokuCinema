import { MediaFiltersSearch } from './../pipes/media/mediaFilters.pipe';
import { MediaFilterPakage } from './../../domain/MediaFilterPackage';
import { MediaTitleSearch } from '../pipes/media/mediaTitle.pipe';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Media } from '../../domain/Media';

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
  mediaFilters: MediaFilterPakage;

  constructor() { 
  }

  ngOnChanges() {
    this.mediaFilters = new MediaFilterPakage(this.mediumFilter, this.spokenLanguageFilter, this.subtitleLanguageFilter, this.countryFilter, this.regionFilter);
    console.log("Filtering by: ")
    console.log(this.searchTerm);
    console.log(this.mediaFilters);
  }

}
