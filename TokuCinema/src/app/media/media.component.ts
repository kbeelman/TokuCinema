import { element } from 'protractor';
import { MediaFilterPakage } from './../../domain/MediaFilterPackage';
import { Component, OnInit } from '@angular/core';
import { Media } from '../../domain/Media';
import { Movie } from '../../domain/Movie';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DomainBuilder, DataType } from './../../domain/Builder';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html'
})
export class MediaComponent implements OnInit {
  mediaItems = new Array<Media>();
  searchTerm: string = '';
  mediumFilter: string = '';
  spokenLanguageFilter: string = '';
  subtitleLanguageFilter: string = '';
  countryFilter: string = '';
  regionFilter: any = '';
  mediaData: FirebaseListObservable<any[]>;
  movieData: FirebaseListObservable<any[]>;
  showFilters: string = "Show filters +";

  // Form use
  mediums = new Array<string>();
  spokenLanguages = new Array<string>();
  subtitleLanguages = new Array<string>();
  countries = new Array<string>();
  regions = new Array<string>();

  constructor(db: AngularFireDatabase) { 
    this.movieData = db.list('/movies');
    this.mediaData = db.list('/media');
  }

  ngOnInit() {
    this.mediaData.forEach(element => {
      for (var i = 0; i < element.length; i++) {
        let domainBuilder = new DomainBuilder(element[i], DataType.Media);
        let domainObject = domainBuilder.getDomainObject();

        // Shitty nested algorithm here
        domainObject.MoviePath.forEach(mediaElement => {
          this.movieData.forEach(moviesElement => {
            moviesElement.forEach(movieElement => {
              if(mediaElement === movieElement.Path) {
                let newBuilder = new DomainBuilder(movieElement, DataType.Movie);
                let movie = newBuilder.getDomainObject();
                domainObject.Movies.push(movie);
              }
            });
          });
        });

        this.mediaItems.push(domainObject);
        this.populateFiltersWithTheseOptions(domainObject);
        console.log(domainObject);
      }
    });
    this.sortFilters();
    this.mediaItems.sort(function(a,b) {
      let countryCompare: number = b.Country.localeCompare(a.Country);
      if (countryCompare !== 0) {
        return countryCompare;
      }

      if(a.ReleaseDate < b.ReleaseDate) {
        return -1;
      }
      else if(a.ReleaseDate > b.ReleaseDate) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }

  public toggleShowFilters(): void {
    if(this.showFilters === 'Show filters +') {
      this.showFilters = 'Hide filters -';
    } else {
      this.showFilters = 'Show filters +';
    }
  }

  public clearFilters(): void {
    this.countryFilter = '';
    this.mediumFilter = '';
    this.regionFilter = '';
    this.spokenLanguageFilter = '';
    this.subtitleLanguageFilter = '';
  }

  // Gurantees filters are only populated with viable options
  private populateFiltersWithTheseOptions(media: Media): void {
    if (!(this.countries.indexOf(media.Country) >= 0)) {
      this.countries.push(media.Country);
    }
    if (!(this.mediums.indexOf(media.Medium) >= 0)) {
      this.mediums.push(media.Medium);
    }
    if (!(this.regions.indexOf(media.Region) >= 0)) {
      this.regions.push(media.Region);
    }
    media.AudioTracks.forEach(element => {
      if (!(this.spokenLanguages.indexOf(element) >= 0)) {
        this.spokenLanguages.push(element);
      }
    });
    media.Subtitles.forEach(element => {
      if (!(this.subtitleLanguages.indexOf(element) >= 0)) {
        this.subtitleLanguages.push(element);
      }
    });
  }

  private sortFilters(): void {
    this.regions.sort();
  }

}
