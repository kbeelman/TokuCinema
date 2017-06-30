import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/takeWhile";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';

import { Movie } from '../../domain/Movie';
import { Media } from '../../domain/Media';
import { MediaDetails } from '../../domain/MediaDetails';
import { MediaReview } from '../../domain/MediaReview';
import { DomainBuilder, DataType } from './../../domain/Builder';
import { StringCleaner, StringType } from './../../domain/StringCleaner';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html',
  providers: [FirebaseService]
})
export class MediadetailsComponent implements OnInit, OnDestroy {
    private alive: boolean = true;
    private path: string = '';
    private sub: any;
    mediaData: FirebaseListObservable<any[]>;
    media: Media;
    mediaDetails: MediaDetails;
    mediaReview: MediaReview;
    movieDetails = new Array<Movie>();
    hasRuntimes: boolean = false;

    dataLoaded: boolean = false;

 constructor(private db: AngularFireDatabase,
      private router: Router,
      private location: Location,
      private route: ActivatedRoute
    ) {
      
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      this.path = params["name"];

      this.router.events.takeWhile(() => this.alive)
      .subscribe((val) => {

        if(this.router.url.split('/')[1] === 'media' && this.router.url.split('/')[2]){
          this.mediaData = this.db.list('/media',
          {
            query: {
              orderByChild: 'Path',
              equalTo: this.path
            }
          });

          this.mediaData.forEach(element => {

            if (!element[0]) {
              // redirect to 404
              this.router.navigate(['404']);
            } else {

              let domainBuilder = new DomainBuilder(element[0], DataType.Media);
              let domainObject = domainBuilder.getDomainObject();
              this.media = domainObject;
              this.mediaDetails = this.media.GetMediaDetails();

              this.mediaDetails.MovieDetails.forEach(index => {
                let movieData = this.db.list('/movies',
                  {
                    query: {
                      orderByChild: 'Path',
                      equalTo: index
                    }
                });
                movieData.forEach(movieElement => {
                  let domainBuilder = new DomainBuilder(movieElement[0], DataType.Movie);
                  let domainObject = domainBuilder.getDomainObject();
                  let movie = domainObject;
                  let alreadyContainsMovie: boolean = false;
                  this.movieDetails.forEach(existingMovies => {
                    if(existingMovies.Path === movie.Path) {
                      alreadyContainsMovie = true;
                    }
                  })
                  if(!alreadyContainsMovie){
                    this.movieDetails.push(movie);
                  }

                })
              })

              // Get the review object
              let reviewData = this.db.list('/mediaReviews',
                {
                  query: {
                      orderByChild: 'Path',
                      equalTo: this.media.Path
                    }
              });

              reviewData.forEach(review => {
                if(review.length > 0) {
                  let domainBuilder = new DomainBuilder(review[0], DataType.MediaReview);
                  let domainObject = domainBuilder.getDomainObject();
                  this.mediaReview = domainObject;
                }
              })
            }
          })
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.alive = false;
  }

  public doesHaveRuntimes(): boolean {
    this.movieDetails.forEach(item => {
      if(!(item.Runtime === undefined)) {
        this.hasRuntimes = true;
      }
    })

    return this.hasRuntimes;
  }
}
