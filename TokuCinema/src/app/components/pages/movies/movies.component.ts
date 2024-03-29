import { DomainBuilder, DataType } from '../../../domain/Builder';
import { Movie } from '../../../domain/Movie';
import { LanguageType } from '../../../domain/Types';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  styleUrls: ['./movies.scss'],
  templateUrl: './movies.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {
  readonly showFilters: string = 'Show filters +';

  title = 'Movies - Toku Cinema';
  movieItems = new Array<Movie>();
  searchTerm: string = '';
  spokenLanguageFilter: LanguageType = '';
  distributorFilter: string = '';
  directorFilter: string = '';
  seriesFilter: string = '';
  eraFilter: string = '';
  productionCompanyFilter: string = '';
  moviesData: Observable<any[]>;
  showFiltersText: string = this.showFilters;

  languages = new Array<string>();
  distributors = new Array<string>();
  directors = new Array<string>();
  series = new Array<string>();
  eras = new Array<string>();
  productionCompanies = new Array<string>();

  constructor(
    fdb: FirebaseService,
    private titleService: Title,
    private metatagService: MetatagService
  ) {
    this.moviesData = fdb.getBranch('movies');
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    const descriptionTag: string = 'Information on all of your favorite Tokusatsu, ' +
    'Giant Monster, and Sci-Fi films; including Godzilla, King Kong, and more.';
    this.metatagService.updateTags([
      { property: 'og:url', content: 'https://tokucinema.com/movies' },
      { property: 'og:title', content: 'Movie List' },
      { property: 'og:description', content: descriptionTag },
      { name: 'description', content: descriptionTag },
      { property: 'og:image', content: '' }
    ]);
    this.moviesData.subscribe((movieArray: Movie[]) => {
      movieArray.forEach((movie: Movie) => {
        const domainBuilder: DomainBuilder = new DomainBuilder(movie, DataType.Movie);
        const domainObject: Movie = domainBuilder.getDomainObject<Movie>();
        this.movieItems.push(domainObject);
        this.populateFiltersWithTheseOptions(domainObject);
      });

      this.movieItems.sort((a: Movie, b: Movie) => {
        const seriesCompare: number = b.Series.localeCompare(a.Series);
        if (seriesCompare !== 0) {
          return seriesCompare;
        }
        if (a.ReleaseYear < b.ReleaseYear) {
          return -1;
        } else if (a.ReleaseYear > b.ReleaseYear) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  public toggleShowFilters(): void {
    if (this.showFiltersText === this.showFilters) {
      this.showFiltersText = 'Hide filters -';
    } else {
      this.showFiltersText = this.showFilters;
    }
  }

  public clearFilters(): void {
    this.directorFilter = '';
    this.distributorFilter = '';
    this.eraFilter = '';
    this.productionCompanyFilter = '';
    this.seriesFilter = '';
    this.spokenLanguageFilter = '';
    this.searchTerm = '';
  }

  populateFiltersWithTheseOptions(movie: Movie): void {
    if (this.directors.indexOf(movie.Director) < 0) {
      this.directors.push(movie.Director);
    }
    if (this.distributors.indexOf(movie.Distributor) < 0) {
      this.distributors.push(movie.Distributor);
    }
    if (this.eras.indexOf(movie.Era) < 0) {
      this.eras.push(movie.Era);
    }
    if (this.series.indexOf(movie.Series) < 0) {
      this.series.push(movie.Series);
    }
    if (this.productionCompanies.indexOf(movie.ProductionCompany) < 0) {
      this.productionCompanies.push(movie.ProductionCompany);
    }
    movie.Languages.forEach((element: LanguageType) => {
      if (this.languages.indexOf(element) < 0) {
        this.languages.push(element);
      }
    });
  }

}
