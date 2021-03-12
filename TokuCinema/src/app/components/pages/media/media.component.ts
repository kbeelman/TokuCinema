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
  readonly showFilters: string = 'Show filters +';

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
  showFiltersText: string = this.showFilters;

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
        this.sortMedia();
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
    if (this.showFiltersText === this.showFilters) {
      this.showFiltersText = 'Hide filters -';
    } else {
      this.showFiltersText = this.showFilters;
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

  /**
   * @description Populates filters based on data from the Media
   * @param {Media} media
   */
  private populateFiltersWithTheseOptions(media: Media): void {
    if (this.shouldPushIntoList(this.countries, media.Country)) {
      this.countries.push(media.Country);
    }
    if (typeof media.Region !== 'undefined' && media.Region.length > 0) {
      media.Region.forEach(element => {
        if (this.shouldPushIntoList(this.regions, element.Region)) {
          this.regions.push(element.Region);
        }
      });
    }
    media.Medium.forEach(element => {
      if (this.shouldPushIntoList(this.mediums, element)) {
        this.mediums.push(element);
      }
    });
    media.AudioTracks.forEach(element => {
      if (this.shouldPushIntoList(this.spokenLanguages, element)) {
        this.spokenLanguages.push(element);
      }
    });
    media.Subtitles.forEach(element => {
      if (this.shouldPushIntoList(this.subtitleLanguages, element)) {
        this.subtitleLanguages.push(element);
      }
    });
  }

  /**
   * @description Checks if an element exists in the list or not and if the element is valid.
   * @param {string[]} list
   * @param {string} element
   * @returns {boolean}
   */
  private shouldPushIntoList(list: string[], element: string): boolean {
    return list.indexOf(element) < 0 && this.isBlank(element);
  }

  /**
   * @description Checks if a string is blank, null, or undefined.
   * @param {string} str
   * @returns {boolean}
   */
  private isBlank(str: string): boolean {
    return (!str || /^\s*$/.test(str));
  }

  /**
   * @description Sorts media in order of Country, Movie release year, Media release year
   */
  private sortMedia(): void {
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
  }

  private sortFilters(): void {
    this.regions.sort();
  }

}
