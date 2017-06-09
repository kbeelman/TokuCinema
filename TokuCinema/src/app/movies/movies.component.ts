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

  languages: Array<string> = [
    "English",
    "Japanese",
    "German",
    "French",
    "Italian"
  ];

  distributors: Array<string> = [
    "Toho",
    "Legendary"
  ];

  directors: Array<string> = [
    "Ishiro Honda",
    "Gareth Edwards",
    "Masaaki Tezuka"
  ];

  series: Array<string> = [
    "Godzilla",
    "Rodan",
    "Mothra"
  ];

  eras: Array<string> = [
    "Showa",
    "Heisei",
    "Millenium"
  ];

  productionCompanies: Array<string> = [
    "Universal",
    "TriStar"
  ];

  constructor(db: AngularFireDatabase) { 
    this.moviesData = db.list('/movies');
  }

  ngOnInit() {
    this.moviesData.forEach(element => {
    for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Movie);
        let domainObject = domainBuilder.getDomainObject();
        this.movieItems.push(domainObject);
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

}
