import { FirebaseService } from './../services/firebase.service';
import { element } from 'protractor';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/takeWhile";
import { FirebaseListObservable } from 'angularfire2/database';

import { Movie } from '../../domain/Movie';
import { DomainBuilder, DataType } from './../../domain/Builder';
import { StringCleaner, StringType } from './../../domain/StringCleaner';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  providers: [FirebaseService]
})
export class MoviedetailsComponent implements OnInit, OnDestroy {
  private alive: boolean = true;
  private path: string = '';
  movie: Movie;

  constructor(private router: Router,
      private location: Location,
      @Inject(FirebaseService) fdb: FirebaseService
    ) { 
    
    router.events.takeWhile(() => this.alive)
    .subscribe((val) => {

      fdb.getItemFromBranch(this.router.url, 'movies', true, DataType.Movie).subscribe( (data) => {
        this.movie = data;
        if (this.movie === undefined) {
          // redirect to 404
          this.router.navigate(['404']);
        }
      });

    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
