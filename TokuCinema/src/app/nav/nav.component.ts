import { Component, OnInit } from '@angular/core';
import { ListMovieItem } from '../../domain/ListMovieItem';
import { MediaDetails } from '../../domain/MediaDetails';
import { ISearchable } from '../../domain/ISearchable';

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
      "ゴジラ (Gojira)",
      ["Aspect Ratio: 4x3", "Runtime: 90 minutes", "Black & White", "Runtime: 96 (Japanese) / 80 (American)",
          "Original Runtime: 96", "Chapter Stops: 12 (Japanese) / 5 (American)", "Subtitles: English"],
      ["Medium: DVD", "Format: Single Sided, Dual-Layer", "Region: 1", "Number of Discs: 2", "Color System: NTSC"],
      ["Distributor: Classic Media", "Catalog Code: 1234", "UPC: 0123456789", "Release Date: 2006"],
      []),
    new MediaDetails("Mothra",
      "ゴジラ (Gojira)",
      ["Aspect Ratio: 4x3", "Runtime: 90 minutes", "Black & White", "Runtime: 96 (Japanese) / 80 (American)",
          "Original Runtime: 96", "Chapter Stops: 12 (Japanese) / 5 (American)", "Subtitles: English"],
      ["Medium: DVD", "Format: Single Sided, Dual-Layer", "Region: 1", "Number of Discs: 2", "Color System: NTSC"],
      ["Distributor: Classic Media", "Catalog Code: 1234", "UPC: 0123456789", "Release Date: 2006"],
      []),
    new MediaDetails("Rodan",
      "ゴジラ (Gojira)",
      ["Aspect Ratio: 4x3", "Runtime: 90 minutes", "Black & White", "Runtime: 96 (Japanese) / 80 (American)",
          "Original Runtime: 96", "Chapter Stops: 12 (Japanese) / 5 (American)", "Subtitles: English"],
      ["Medium: DVD", "Format: Single Sided, Dual-Layer", "Region: 1", "Number of Discs: 2", "Color System: NTSC"],
      ["Distributor: Classic Media", "Catalog Code: 1234", "UPC: 0123456789", "Release Date: 2006"],
      [])
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
