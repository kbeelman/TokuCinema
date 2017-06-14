import { DomainBuilder, DataType } from './../../domain/Builder';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Media } from '../../domain/Media';
import { Movie } from '../../domain/Movie';
import { ISearchable } from '../../domain/ISearchable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  navMenuOpen: boolean = false;
  searchOpen: boolean = false;
  menuItems: Array<{"text": string, "link": string}> = [
    {"text": 'Home', "link": '/home'},
    {"text": 'Movie List', "link": '/movies'},
    {"text": 'Home Media Releases', "link": '/media'},
    {"text": 'About', "link": '/about'}
  ];
  movieItems = new Array<Movie>();
  mediaItems = new Array<Media>();
  searchTerm: string = '';

  moviesData: FirebaseListObservable<any[]>;
  mediaData: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase) { 
    this.moviesData = db.list('/movies');
    this.mediaData = db.list('/media');
  }

  ngOnInit() {
    // Transform Movies
    this.moviesData.forEach(element => {
      for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Movie);
        let domainObject = domainBuilder.getDomainObject();
        this.movieItems.push(domainObject);
      }
    });

    // Transform Media
    this.mediaData.forEach(element => {
      for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Media);
        let domainObject = domainBuilder.getDomainObject();
        this.mediaItems.push(domainObject);
      }
    });
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
