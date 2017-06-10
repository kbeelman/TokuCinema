import { Component, OnInit } from '@angular/core';
import { Movie } from '../../domain/Movie';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomainBuilder, DataType } from './../../domain/Builder';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  movieItems = new Array<Movie>();
  searchTerm: string = '';
  spokenLanguageFilter: string = '';
  distributorFilter: string = '';
  directorFilter: string = '';
  seriesFilter: string = '';
  eraFilter: string = '';
  productionCompanyFilter: string = '';
  moviesData: FirebaseListObservable<any[]>;
  showFilters: string = "Show filters +";

  languages = new Array<string>();
  distributors = new Array<string>();
  directors = new Array<string>();
  series = new Array<string>();
  eras = new Array<string>();
  productionCompanies = new Array<string>();

  constructor(db: AngularFireDatabase) { 
    this.moviesData = db.list('/movies');
  }

  ngOnInit() {
    this.moviesData.forEach(element => {
    for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Movie);
        let domainObject = domainBuilder.getDomainObject();
        this.movieItems.push(domainObject);
        this.populateFiltersWithTheseOptions(domainObject);
        console.log(domainObject);
      }
    });
  }

  public toggleShowFilters(): void {
    if(this.showFilters === 'Show filters +') {
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
  }

  populateFiltersWithTheseOptions(movie: Movie): void {
    if (!this.directors.includes(movie.Director)) {
      this.directors.push(movie.Director);
    }
    if (!this.distributors.includes(movie.Distributor)) {
      this.distributors.push(movie.Distributor);
    }
    if (!this.eras.includes(movie.Era)) {
      this.eras.push(movie.Era);
    }
    if (!this.series.includes(movie.Series)) {
      this.series.push(movie.Series);
    }
    if (!this.productionCompanies.includes(movie.ProductionCompany)) {
      this.productionCompanies.push(movie.ProductionCompany);
    }
    movie.Languages.forEach(element => {
      if (!this.languages.includes(element)) {
        this.languages.push(element);
      }
    });
  }

}
