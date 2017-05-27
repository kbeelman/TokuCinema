import { Component, OnInit, Input } from '@angular/core';
import { ISearchable } from '../../domain/ISearchable';
import { Search } from '../pipes/search.pipe';
import { ListMovieItem } from '../../domain/ListMovieItem';
import { MediaDetails } from '../../domain/MediaDetails';
import { ItemType } from '../../domain/ItemType';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {
  @Input() searchTerm: string;
  @Input() searchItems: Array<ISearchable>;
  movieItems: Array<{"name": string, "type": string}> = new Array<{"name": string, "type": string}>();
  mediaItems: Array<{"name": string, "type": string}> = new Array<{"name": string, "type": string}>();
  movieResultCount: number = 0;
  mediaResultCount: number = 0;

  constructor() { }

  ngOnInit() {
    // Populate movies
    this.searchItems.forEach(element => {
      if (element.getType() === ItemType.Movie) {
        this.movieItems.push({name: element.getName(), type: 'Movie'});
      } else if (element.getType() === ItemType.Media) {
        this.mediaItems.push({name: element.getName(), type: 'Media'});
      }
    });

    console.log("movie count: ");
    console.log(this.movieResultCount);
  }

}
