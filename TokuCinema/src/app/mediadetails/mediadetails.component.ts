import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, Params, ActivatedRoute }   from '@angular/router';
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
    private fdb: FirebaseService;
    mediaData: FirebaseListObservable<any[]>;
    media: Media;
    mediaDetails: MediaDetails;
    mediaReview: MediaReview;
    movieDetails: any = [];
    hasRuntimes: boolean = false;


 constructor(@Inject(FirebaseService) fdb: FirebaseService,
      private router: Router,
      private location: Location,
      private route: ActivatedRoute
    ) {

    this.sub = this.route.params.subscribe(params => {
      this.path = params["name"];

        fdb.getItemFromBranch(this.router.url, 'media', true, DataType.Media).subscribe( (data) => {
          this.media = data;
          if (this.media === undefined) {
            // redirect to 404
            this.router.navigate(['404']);
          }

          this.mediaDetails = this.media.GetMediaDetails();

          this.mediaDetails.MovieDetails.forEach(element => {
            fdb.getItemFromBranch(element, 'movies', false, DataType.Movie).subscribe( (data) => {
              if (data) 
              {
                let alreadyContainsMovie: boolean = false;
                this.movieDetails.forEach(existingMovies => {
                  if(existingMovies.Path === data["Path"]) {
                    alreadyContainsMovie = true;
                  }
                })
                if (!alreadyContainsMovie) {
                  this.movieDetails.push(data);
                }
              }
            });
            
          });

          // Get the review object
          fdb.getItemFromBranch(this.media.Path, 'mediaReviews', false, DataType.MediaReview).subscribe( (data) => {
            this.mediaReview = data;
            console.log(data);      
          });
        });
      });
       
    }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
