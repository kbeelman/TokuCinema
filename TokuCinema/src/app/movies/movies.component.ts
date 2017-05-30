import { Component, OnInit } from '@angular/core';
// import { ListMovieItem } from '../../domain/ListMovieItem';
import { Movie } from '../../domain/Movie';
import { stubMovies } from '../../assets/data/stubData';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {
  movies: Array<Movie> = stubMovies;
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }

}
