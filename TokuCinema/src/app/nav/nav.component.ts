import { Component, OnInit } from '@angular/core';
import { ListMovieItem } from '../../domain/ListMovieItem';
import { MediaDetails } from '../../domain/MediaDetails';
import { INameable } from '../../domain/INameable';

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
  movieItems: Array<ListMovieItem> = [
    new ListMovieItem("Godzilla", "Gojira", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRT2ObE6c9lJr2ACGmOuPKpX2W5JOTalB59dAdBOU1_ThrLcx9", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("King Kong", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Mothra", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Frankenfuck", "Gojira", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRT2ObE6c9lJr2ACGmOuPKpX2W5JOTalB59dAdBOU1_ThrLcx9", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Gamera", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Ghidorah", "Gojira", "http://placehold.it/200x200", 1954, "Toho", "http://placehold.it/50x50"),
    new ListMovieItem("Batra", "Gojira", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRT2ObE6c9lJr2ACGmOuPKpX2W5JOTalB59dAdBOU1_ThrLcx9", 1954, "Toho", "http://placehold.it/50x50")
  ];
  mediaItems: Array<MediaDetails> = [
    new MediaDetails("Godzilla",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"]),
    new MediaDetails("Mothra",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"]),
    new MediaDetails("Rodan",
    ["Aspect Ratio: 4x3", "Runtime: 90 minutes"],
    ["Region: 1", "Number of Discs: 2"],
    ["Distributor: Classic Media", "Catalog Code: 1234"])
  ];
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

  getSearchItems(): Array<INameable> {
    let result: Array<INameable> = new Array<INameable>();
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
