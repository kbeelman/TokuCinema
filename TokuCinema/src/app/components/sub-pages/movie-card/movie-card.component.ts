import { Component, Input } from '@angular/core';
import { Movie } from '../../../domain/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() movie: Movie;

  constructor() { }

}
