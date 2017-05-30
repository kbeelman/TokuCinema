import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { ListMovieItem } from '../../domain/ListMovieItem';
// import { MediaDetails } from '../../domain/MediaDetails';
import { Media } from '../../domain/Media';
import { Movie } from '../../domain/Movie';
import { ISearchable } from '../../domain/ISearchable';
import { stubMedia, stubMovies } from '../../assets/data/stubData';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  navMenuOpen: boolean = false;
  searchOpen: boolean = false;
  menuItems: Array<{"text": string, "link": string}> = [
    {"text": 'Home', "link": '/home'},
    {"text": 'About', "link": '/about'},
    {"text": 'Movies', "link": '/movies'},
    {"text": 'Media', "link": '/media'}
  ];
  movieItems: Array<Movie> = stubMovies;
  mediaItems: Array<Media> = stubMedia;
  searchTerm: string = '';

  constructor() { }

  ngOnInit() {
  }

  toggleNavMenu(): void {
    this.navMenuOpen = !this.navMenuOpen;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
  }

  closeNav(): void {
    this.navMenuOpen = false;
    this.searchOpen = false;
  }

  @Output() searchEvent = new EventEmitter();
  clearSearch(): void {
    this.searchEvent.emit(this.searchTerm = '');
  }
  getSearchItems(): Array<ISearchable> {
    let result: Array<ISearchable> = new Array<ISearchable>();
    // Add Movies
    this.movieItems.forEach(element => {
      result.push(element);
    });
    // Add Media
    this.mediaItems.forEach(element => {
      result.push(element);
    });
    return result;
  }

}
