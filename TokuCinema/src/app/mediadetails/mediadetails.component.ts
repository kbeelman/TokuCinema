import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/takeWhile";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Movie } from '../../domain/Movie';
import { Media } from '../../domain/Media';
import { MediaDetails } from '../../domain/MediaDetails';
import { DomainBuilder, DataType } from './../../domain/Builder';
import { StringCleaner, StringType } from './../../domain/StringCleaner';

@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.component.html'
})
export class MediadetailsComponent implements OnInit, OnDestroy {
    private alive: boolean = true;
    mediaData: FirebaseListObservable<any[]>;
    media: Media;
    mediaDetails: MediaDetails;
    movieDetails = new Array<Movie>();

    dataLoaded: boolean = false;

 constructor(db: AngularFireDatabase,
      private router: Router,
      private location: Location,
    ) { 
    
    router.events.takeWhile(() => this.alive)
    .subscribe((val) => {

      if(this.router.url.split('/')[1] === 'media' && this.router.url.split('/')[2]){
        let Path = new StringCleaner(this.router.url, StringType.WithRoute).getCleanString();
        this.mediaData = db.list('/media',
        {
          query: {
            orderByChild: 'Path',
            equalTo: Path
          }
        });

        this.mediaData.forEach(element => {
          let domainBuilder = new DomainBuilder(element[0], DataType.Media);
          let domainObject = domainBuilder.getDomainObject();
          this.media = domainObject;
          this.mediaDetails = this.media.GetMediaDetails();
          
          this.mediaDetails.MovieDetails.forEach(index => {
            let movieData = db.list('/movies',
              {
                query: {
                  orderByChild: 'Path',
                  equalTo: index
                }
            });
            movieData.forEach(movieElement => {
              let domainBuilder = new DomainBuilder(movieElement[0], DataType.Movie);
              let domainObject = domainBuilder.getDomainObject();
              this.movieDetails.push(domainObject);
              console.log(this.movieDetails);
            })
          })
        })
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.alive = false;
  }

}
