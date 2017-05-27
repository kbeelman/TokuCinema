import { Component, OnInit } from '@angular/core';
import { ListMovieItem } from '../../domain/ListMovieItem';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  movies: Array<ListMovieItem> = [
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Godzilla", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50")
  ];

  constructor() { }

  ngOnInit() {
  }

}
