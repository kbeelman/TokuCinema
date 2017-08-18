import { element } from 'protractor';
import { MediaFilterPakage } from '../../../domain/MediaFilterPackage';
import { Component, OnInit, Inject } from '@angular/core';
import { Media } from '../../../domain/Media';
import { Movie } from '../../../domain/Movie';
import { FirebaseListObservable } from 'angularfire2/database';
import { DomainBuilder, DataType } from '../../../domain/Builder';
import { FirebaseService } from '../../../services/firebase.service';

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

  constructor(private fdb: FirebaseService) {
    this.movieData = fdb.getBranch('movies');
    this.mediaData = fdb.getBranch('media');
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
      }
    });
    this.sortFilters();
    this.mediaItems.sort(function(a,b) {
      if (a.Movies[0] && b.Movies[0]) {
        let countryCompare: number = b.Country.localeCompare(a.Country);
        if (countryCompare !== 0) {
          return countryCompare;
        }
        if(a.Movies[0].ReleaseYear < b.Movies[0].ReleaseYear)
        {
          return -1;
        }
        else if(a.Movies[0].ReleaseYear > b.Movies[0].ReleaseYear)
        {
          return 1;
        }
  
  
        if(a.ReleaseYear < b.ReleaseYear) {
          return -1;
        }
        else if(a.ReleaseYear > b.ReleaseYear) {
          return 1;
        }
        else {
          return 0;
        }
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
    this.searchTerm = '';
  }

  // Gurantees filters are only populated with viable options
  private populateFiltersWithTheseOptions(media: Media): void {
    if (!(this.countries.indexOf(media.Country) >= 0)) {
      this.countries.push(media.Country);
    }
    media.Medium.forEach(element => {
      if (!(this.mediums.indexOf(element) >= 0) && (!(element == ""))) {
        this.mediums.push(element);
      }
    })
    if(typeof media.Region !== 'undefined') {
      if(media.Region.length > 0) {
        media.Region.forEach(element => {
          if (!(this.regions.indexOf(element.Region) >= 0) && (!(element.Region == ""))) {
            this.regions.push(element.Region);
          }
        });
      }
    }
    media.AudioTracks.forEach(element => {
      if (!(this.spokenLanguages.indexOf(element) >= 0) && (!(element == ""))) {
        this.spokenLanguages.push(element);
      }
    });
    media.Subtitles.forEach(element => {
      if (!(this.subtitleLanguages.indexOf(element) >= 0) && (!(element == ""))) {
        this.subtitleLanguages.push(element);
      }
    });

  }

  private sortFilters(): void {
    this.regions.sort();
  }

}
