import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  movies: Array<{"title": string, "altTitle": string, "posterImg": string,
    "releaseYear": number, "productionCompany": string}> = [

  ];

  constructor() { }

  ngOnInit() {
  }

}
