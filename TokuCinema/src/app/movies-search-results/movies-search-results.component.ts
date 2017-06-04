import { MovieTitleSearch } from './../pipes/movies/movieTitle.pipe';
import { Movie } from './../../domain/Movie';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movies-search-results',
  templateUrl: './movies-search-results.component.html'
})
export class MoviesSearchResultsComponent implements OnInit {
  @Input() movieItems: Array<Movie>;
  @Input() searchTerm: string;

  constructor() { }

  ngOnInit() {
  }

}
