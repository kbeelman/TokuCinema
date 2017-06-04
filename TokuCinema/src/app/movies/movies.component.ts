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
  moviesData: FirebaseListObservable<any[]>;

  languages: Array<string> = [
    "English",
    "Japanese",
    "German",
    "French",
    "Italian"
  ];

  studios: Array<string> = [
    "Toho",
    "Legendary"
  ];

  directors: Array<string> = [
    "Ishiro Honda",
    "Rick James"
  ];

  series: Array<string> = [
    "Godzilla",
    "Rodan",
    "Mothra"
  ];

  eras: Array<string> = [
    "Showa",
    "Heisei",
    "Millenium Falcon"
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
      }
    });
  }

}
