import { DataType } from '../../../domain/Builder';
import { Movie } from '../../../domain/Movie';
import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';
import { FirebaseService } from '../../../services/firebase.service';
import { MetatagService } from '../../../services/metatag.service';

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html'
})
export class MoviedetailsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public pageNotFound: boolean = false;
  public activeAltCountry: any; // used for mobile alt version selector

  movie: Movie;
  movieAlternateVersion: MovieAlternateVersion;
  moviesData: AngularFireList<any[]>;

  constructor(
    private router: Router,
    private fdb: FirebaseService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metatagService: MetatagService
  ) {

    this.sub = this.route.params.subscribe(params => {

      fdb.getItemFromBranch(this.router.url, 'movies', true, DataType.Movie).subscribe( (data) => {
        this.movie = data;
        if (this.movie === undefined) {
          // redirect to 404
          this.pageNotFound = true;
        }
        this.titleService.setTitle(this.movie.OfficialTitle + ' (' + this.movie.ReleaseYear + ') - Toku Cinema');
        this.metatagService.updateTags([
          { name: 'twitter:card', content: 'summary' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://tokucinema.com' + this.router.url },
          { property: 'og:title', content: this.movie.OfficialTitle },
          { property: 'og:description', content: this.movie.OfficialTitle },
          { property: 'og:image', content: this.movie.OriginalPoster[1] }
        ]);
        fdb.getImageMetadata(this.movie.Path, 'movies').subscribe((metadata) => {
          const customMetadata = metadata.customMetadata;
          if (customMetadata) {
            if (customMetadata.width && customMetadata.height) {
              this.metatagService.updateTags([
                { property: 'og:image:width', content: customMetadata.width },
                { property: 'og:image:height', content: customMetadata.height }
              ]);
            }
          }
        });
      });

      fdb.getItemFromBranch(this.router.url, 'alternateVersions', true, DataType.MovieAlternateVersion).subscribe( (data) => {
        if (!(data === undefined)) {
          this.movieAlternateVersion = data;
          this.movieAlternateVersion.Countries[0].Active = true;
          this.activeAltCountry = this.movieAlternateVersion.Countries[0].Country;
        }
      });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleCountries(country: string) {
    this.movieAlternateVersion.Countries.forEach(element => {
      if (element.Country === country) {
        element.Active = true;
      } else {
        element.Active = false;
      }
    });
  }

  isCircaDate(releaseDate: string): boolean {
    let response: boolean = false;
    if (isNaN(Number(releaseDate.substr(0, 4)))) {
      response = true;
    }

    return response;
  }

}
