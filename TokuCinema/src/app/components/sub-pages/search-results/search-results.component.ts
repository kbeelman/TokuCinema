import { ISearchable } from '../../../domain/ISearchable';
import { ItemType } from '../../../domain/ItemType';
import { DeepSearchObject } from '../../../domain/Types';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {
  @Input() searchTerm: string;
  @Input() searchItems: Array<ISearchable>;
  movieItems = new Array<DeepSearchObject>();
  mediaItems = new Array<DeepSearchObject>();

  constructor() { }

  ngOnInit() {
    // Populate movies
    if (this.searchItems) {
      this.searchItems.forEach(subElement => {
        if (subElement.getType() === ItemType.Movie) {
          this.movieItems.push(
            {
              name: subElement.getDisplayName(this.searchTerm),
              names: subElement.getKeywords(),
              type: 'Movie',
              path: subElement.getPath(),
              score: 0,
              iconName: subElement.getIconName()
            });
        } else if (subElement.getType() === ItemType.Media) {
          this.mediaItems.push(
            {
              name: subElement.getDisplayName(),
              names: subElement.getKeywords(),
              type: 'Media',
              path: subElement.getPath(),
              score: 0,
              iconName: subElement.getIconName()
            });
        }
      });
    }
  }
}
