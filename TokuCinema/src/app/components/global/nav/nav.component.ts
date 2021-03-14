import { DomainBuilder, DataType } from '../../../domain/Builder';
import { ISearchable } from '../../../domain/ISearchable';
import { Media } from '../../../domain/Media';
import { Movie } from '../../../domain/Movie';
import { MenuItems } from '../../../domain/Types';
import { FirebaseService } from '../../../services/firebase.service';

import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  navMenuOpen: boolean = false;
  searchOpen: boolean = false;
  menuItems: Array<MenuItems> = [
    { text: 'Home', link: '/' },
    { text: 'Movie List', link: '/movies' },
    { text: 'Home Media Releases', link: '/media' },
    { text: 'About', link: '/about' }
  ];
  movieItems = new Array<Movie>();
  mediaItems = new Array<Media>();
  searchTerm: string = '';

  moviesData: Observable<any[]>;
  mediaData: Observable<any[]>;

  constructor(
    private fdb: FirebaseService,
    private ngZone: NgZone
  ) {
    this.moviesData = this.fdb.getBranch('movies');
    this.mediaData = this.fdb.getBranch('media');
  }

  ngOnInit() {
    // Transform Movies
    this.moviesData.subscribe((movies: Movie[]) => {
      movies.forEach((movie: Movie) => {
        const domainBuilder = new DomainBuilder(movie, DataType.Movie);
        const domainObject = domainBuilder.getDomainObject<Movie>();
        this.movieItems.push(domainObject);
      });
    });

    // Transform Media
    this.mediaData.subscribe((medias: Media[]) => {
      medias.forEach((media: Media) => {
        const domainBuilder = new DomainBuilder(media, DataType.Media);
        const domainObject = domainBuilder.getDomainObject<Media>();
        this.mediaItems.push(domainObject);
      });
    });
  }

  public toggleNavMenu(): void {
    this.navMenuOpen = !this.navMenuOpen;
    if (this.searchOpen) {
      this.searchOpen = !this.searchOpen;
    }
  }

  public toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => document?.getElementById('search-input')?.focus());
      });
    }
    if (this.navMenuOpen) {
      this.navMenuOpen = !this.navMenuOpen;
    }
  }

  public closeNav(): void {
    this.navMenuOpen = false;
    this.searchOpen = false;
  }

  clearSearch(): void {
    this.searchEvent.emit(this.searchTerm = '');
  }

  getSearchItems(): Array<ISearchable> {
    const result: Array<ISearchable> = new Array<ISearchable>();
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
