import { LanguageType } from '../../../domain/Types';
import { MovieFilterPackage } from '../../../domain/MovieFilterPackage';
import { Movie } from '../../../domain/Movie';

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-movies-search-results',
  templateUrl: './movies-search-results.component.html'
})
export class MoviesSearchResultsComponent implements OnChanges {
  @Input() movieItems: Array<Movie>;
  @Input() searchTerm: string;
  @Input() spokenLanguageFilter: LanguageType;
  @Input() distributor: string;
  @Input() director: string;
  @Input() series: string;
  @Input() era: string;
  @Input() productionCompany: string;
  @Input() seriesToIterate: Array<string>;
  movieFiltersPackage: MovieFilterPackage;

  constructor() { }

  ngOnChanges() {
    this.movieFiltersPackage = new MovieFilterPackage(this.spokenLanguageFilter,
      this.distributor,
      this.director,
      this.series,
      this.era,
      this.productionCompany);
  }

}
