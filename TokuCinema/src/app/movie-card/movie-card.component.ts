import { Component, OnInit, Input } from '@angular/core';
import { ListMovieItem } from '../../domain/ListMovieItem';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent implements OnInit {
  @Input() movie: ListMovieItem;

  constructor() { }

  ngOnInit() {
  }

}
