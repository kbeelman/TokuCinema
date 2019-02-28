import { FirebaseService } from '../../../services/firebase.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import "rxjs/add/operator/takeWhile";
import { AngularFireList } from '@angular/fire/database';

import { Movie } from '../../../domain/Movie';
import { MovieAlternateVersion } from '../../../domain/MovieAlternateVersion';
import { DataType } from '../../../domain/Builder';

import 'rxjs-compat';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html'
})
export class MoviedetailsComponent implements OnInit, OnDestroy {
  private alive: boolean = true;
  private path: string = '';
  public pageNotFound: boolean = false;
  public activeAltCountry: any; // used for mobile alt version selector
  movie: Movie;
  movieAlternateVersion: MovieAlternateVersion;
  moviesData: AngularFireList<any[]>;

  constructor(private router: Router,
      private location: Location,
      private fdb: FirebaseService
    ) {

    router.events.takeWhile(() => this.alive)
    .subscribe((val) => {

      fdb.getItemFromBranch(this.router.url, 'movies', true, DataType.Movie).subscribe( (data) => {
        this.movie = data;
        if (this.movie === undefined) {
          // redirect to 404
          this.pageNotFound = true;
        }
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
    this.alive = false;
  }

  toggleCountries(country: string) {
    this.movieAlternateVersion.Countries.forEach(element => {
      if(element.Country === country) {
        element.Active = true;
      }
      else {
        element.Active = false;
      }
    });
  }

  isCircaDate(releaseDate: string): boolean {
    let response: boolean = false;
    if(isNaN(Number(releaseDate.substr(0,4)))) {
      response = true;
    }

    return response;
  }

}
