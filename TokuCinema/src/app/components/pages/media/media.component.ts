import { DomainBuilder, DataType } from '../../../domain/Builder';
import { Media } from '../../../domain/Media';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Movie } from '../../../domain/Movie';

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
    private titleService: Title,
    private metatagService: MetatagService
  ) {
    this.movieData = this.fdb.getBranch('movies');
    this.mediaData = this.fdb.getBranch('media');
  }

  ngOnInit() {
    this.movieData.subscribe(movieArray => {
      this.mediaData.subscribe(mediaArray => {
        mediaArray.forEach((element) => {
          const domainBuilder = new DomainBuilder(element, DataType.Media);
          const domainObject = domainBuilder.getDomainObject<Media>();

          domainObject.MoviePath.forEach(mediaElement => {
            movieArray.forEach(movieElement => {
              if (mediaElement === movieElement.Path) {
                const movieBuilder = new DomainBuilder(movieElement, DataType.Movie);
                const movie = movieBuilder.getDomainObject<Movie>();
                domainObject.Movies.push(movie);
              }
            });
          });

          this.mediaItems.push(domainObject);
          this.populateFiltersWithTheseOptions(domainObject);
        });

        this.sortFilters();
        this.mediaItems.sort((a: Media, b: Media) => {
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
          } else {
            return 0;
          }
        });
      });
    });

    this.titleService.setTitle(this.title);
    const descriptionTag = 'Details on home media releases across a wide range of formats, ' +
    'as well as reviews capturing everything from video quality to special features.';
    this.metatagService.updateTags([
      { property: 'og:url', content: 'https://tokucinema.com/media' },
      { property: 'og:title', content: 'Home Media Releases' },
      { property: 'og:description', content: descriptionTag },
      { name: 'description', content: descriptionTag },
      { property: 'og:image', content: '' }
    ]);
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
    });
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
