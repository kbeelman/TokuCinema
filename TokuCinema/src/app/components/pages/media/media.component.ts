import { DomainBuilder, DataType } from '../../../domain/Builder';
import { Media } from '../../../domain/Media';
import { FirebaseService } from '../../../services/firebase.service';

import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media',
  styleUrls: ['./media.scss'],
  templateUrl: './media.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MediaComponent implements OnInit {
  title = 'Media - Toku Cinema';
  mediaItems = new Array<Media>();
  searchTerm: string = '';
  mediumFilter: string = '';
  spokenLanguageFilter: string = '';
  subtitleLanguageFilter: string = '';
  countryFilter: string = '';
  regionFilter: any = '';
  mediaData: Observable<any[]>;
  movieData: Observable<any[]>;
  showFilters: string = 'Show filters +';

  // Form use
  mediums = new Array<string>();
  spokenLanguages = new Array<string>();
  subtitleLanguages = new Array<string>();
  countries = new Array<string>();
  regions = new Array<string>();

  constructor(
    private fdb: FirebaseService,
    private titleService: Title
  ) {
    this.movieData = fdb.getBranch('movies');
    this.mediaData = fdb.getBranch('media');
  }

  ngOnInit() {
    this.mediaData.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        const domainBuilder = new DomainBuilder(element[i], DataType.Media);
        const domainObject = domainBuilder.getDomainObject();

        // Shitty nested algorithm here
        domainObject.MoviePath.forEach(mediaElement => {
          this.movieData.forEach(moviesElement => {
            moviesElement.forEach(movieElement => {
              if (mediaElement === movieElement.Path) {
                const newBuilder = new DomainBuilder(movieElement, DataType.Movie);
                const movie = newBuilder.getDomainObject();
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
    this.mediaItems.sort(function(a, b) {
      if (a.Movies[0] && b.Movies[0]) {
        const countryCompare: number = b.Country.localeCompare(a.Country);
        if (countryCompare !== 0) {
          return countryCompare;
        }
        if (a.Movies[0].ReleaseYear < b.Movies[0].ReleaseYear) {
          return -1;
        } else if (a.Movies[0].ReleaseYear > b.Movies[0].ReleaseYear) {
          return 1;
        }

        if (a.ReleaseYear < b.ReleaseYear) {
          return -1;
        } else if (a.ReleaseYear > b.ReleaseYear) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    this.titleService.setTitle(this.title);
  }

  public toggleShowFilters(): void {
    if (this.showFilters === 'Show filters +') {
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
      if (!(this.mediums.indexOf(element) >= 0) && (!(element === ''))) {
        this.mediums.push(element);
      }
    })
    if (typeof media.Region !== 'undefined') {
      if (media.Region.length > 0) {
        media.Region.forEach(element => {
          if (!(this.regions.indexOf(element.Region) >= 0) && (!(element.Region === ''))) {
            this.regions.push(element.Region);
          }
        });
      }
    }
    media.AudioTracks.forEach(element => {
      if (!(this.spokenLanguages.indexOf(element) >= 0) && (!(element === ''))) {
        this.spokenLanguages.push(element);
      }
    });
    media.Subtitles.forEach(element => {
      if (!(this.subtitleLanguages.indexOf(element) >= 0) && (!(element === ''))) {
        this.subtitleLanguages.push(element);
      }
    });

  }

  private sortFilters(): void {
    this.regions.sort();
  }

}
