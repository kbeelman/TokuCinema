import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { ISearchable } from '../../../domain/ISearchable';
import { DeepSearch } from '../../../pipes/deepSearch.pipe';
import { MediaDetails } from '../../../domain/MediaDetails';
import { ItemType } from '../../../domain/ItemType';
import { Keyword } from '../../../domain/Keyword';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {
  @Input() searchTerm: string;
  @Input() searchItems: Array<ISearchable>;
  movieItems = new Array<{"name": string, "names": Array<Keyword>, "type": string, "path": string, "score": number, 'iconName': string}>();
  mediaItems = new Array<{"name": string, "names": Array<Keyword>, "type": string, "path": string, "score": number, 'iconName': string}>();

  constructor() { }

  ngOnInit() {
    // Populate movies
    if(this.searchItems) {
      this.searchItems.forEach(element => {
        if (element.getType() === ItemType.Movie) {
          this.movieItems.push({name: element.getDisplayName(this.searchTerm), names: element.getKeywords(), type: 'Movie', path: element.getPath(), score: 0, iconName: element.getIconName()});
        } else if (element.getType() === ItemType.Media) {
          this.mediaItems.push({name: element.getDisplayName(), names: element.getKeywords(), type: 'Media', path: element.getPath(), score: 0, iconName: element.getIconName()});
        }
      });
    }
  }
}
