import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { ISearchable } from '../../domain/ISearchable';
import { Search } from '../pipes/search.pipe';
import { MediaDetails } from '../../domain/MediaDetails';
import { ItemType } from '../../domain/ItemType';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {
  @Input() searchTerm: string;
  @Input() searchItems: Array<ISearchable>;
  movieItems = new Array<{"name": string, "type": string, "path": string}>();
  mediaItems = new Array<{"name": string, "type": string, "path": string}>();

  constructor() { }

  ngOnInit() {
    // Populate movies
    if(this.searchItems) {
      this.searchItems.forEach(element => {
        if (element.getType() === ItemType.Movie) {
          this.movieItems.push({name: element.getDisplayName(), type: 'Movie', path: element.getPath()});
        } else if (element.getType() === ItemType.Media) {
          this.mediaItems.push({name: element.getDisplayName(), type: 'Media', path: element.getPath()});
        }
      });
    }

  }

}
