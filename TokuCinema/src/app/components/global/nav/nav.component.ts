import { DomainBuilder, DataType } from '../../../domain/Builder';
import { ISearchable } from '../../../domain/ISearchable';
import { Media } from '../../../domain/Media';
import { Movie } from '../../../domain/Movie';
import { FirebaseService } from '../../../services/firebase.service';

import { Component, OnInit, Output, EventEmitter, NgZone, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  @Output() searchEvent = new EventEmitter();
  navMenuOpen: boolean = false;
  searchOpen: boolean = false;
  menuItems: Array<{'text': string, 'link': string}> = [
    {'text': 'Home', 'link': '/'},
    {'text': 'Movie List', 'link': '/movies'},
    {'text': 'Home Media Releases', 'link': '/media'},
    {'text': 'About', 'link': '/about'}
  ];
  movieItems = new Array<Movie>();
  mediaItems = new Array<Media>();
  searchTerm: string = '';

  moviesData: Observable<any[]>;
  mediaData: Observable<any[]>;

  constructor(
    private fdb: FirebaseService,
    private _ngZone: NgZone
  ) {
    this.moviesData = fdb.getBranch('movies');
    this.mediaData = fdb.getBranch('media');
  }

  ngOnInit() {
    // Transform Movies
    this.moviesData.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        const domainBuilder = new DomainBuilder(element[i], DataType.Movie);
        const domainObject = domainBuilder.getDomainObject();
        this.movieItems.push(domainObject);
      }
    });

    // Transform Media
    this.mediaData.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        const domainBuilder = new DomainBuilder(element[i], DataType.Media);
        const domainObject = domainBuilder.getDomainObject();
        this.mediaItems.push(domainObject);
      }
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
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => document.getElementById('search-input').focus());
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
