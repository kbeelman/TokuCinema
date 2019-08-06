import { DomainBuilder, DataType } from '../../../domain/Builder';
import { Movie } from '../../../domain/Movie';
import { FirebaseService } from '../../../services/firebase.service';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  styleUrls: ['./movies.scss'],
  templateUrl: './movies.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {
  title = 'Movies - Toku Cinema';
  movieItems = new Array<Movie>();
  searchTerm: string = '';
  spokenLanguageFilter: string = '';
  distributorFilter: string = '';
  directorFilter: string = '';
  seriesFilter: string = '';
  eraFilter: string = '';
  productionCompanyFilter: string = '';
  moviesData: Observable<any[]>;
  showFilters: string = 'Show filters +';

  languages = new Array<string>();
  distributors = new Array<string>();
  directors = new Array<string>();
  series = new Array<string>();
  eras = new Array<string>();
  productionCompanies = new Array<string>();

  constructor(
    fdb: FirebaseService,
    private titleService: Title
  ) {
    this.moviesData = fdb.getBranch('movies');
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.moviesData.forEach(element => {
    for (let i = 0; i < element.length; i++) {
        const domainBuilder = new DomainBuilder(element[i], DataType.Movie);
        const domainObject = domainBuilder.getDomainObject();
        this.movieItems.push(domainObject);
        this.populateFiltersWithTheseOptions(domainObject);
      }
    });
  }

  public toggleShowFilters(): void {
    if (this.showFilters === 'Show filters +') {
      this.showFilters = 'Hide filters -';
    } else {
      this.showFilters = 'Show filters +';
    }
  }

  public clearFilters(): void {
    this.directorFilter = '';
    this.distributorFilter = '';
    this.eraFilter = '';
    this.productionCompanyFilter = '';
    this.seriesFilter = '';
    this.spokenLanguageFilter = '';
    this.searchTerm = '';
  }

  populateFiltersWithTheseOptions(movie: Movie): void {
    if (!(this.directors.indexOf(movie.Director) >= 0)) {
      this.directors.push(movie.Director);
    }
    if (!(this.distributors.indexOf(movie.Distributor) >= 0)) {
      this.distributors.push(movie.Distributor);
    }
    if (!(this.eras.indexOf(movie.Era) >= 0)) {
      this.eras.push(movie.Era);
    }
    if (!(this.series.indexOf(movie.Series) >= 0)) {
      this.series.push(movie.Series);
    }
    if (!(this.productionCompanies.indexOf(movie.ProductionCompany) >= 0)) {
      this.productionCompanies.push(movie.ProductionCompany);
    }
    movie.Languages.forEach(element => {
      if (!(this.languages.indexOf(element) >= 0)) {
        this.languages.push(element);
      }
    });
  }

}
