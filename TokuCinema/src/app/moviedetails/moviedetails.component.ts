import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Movie } from '../../domain/Movie';
import { DomainBuilder, DataType } from './../../domain/Builder';
import { StringCleaner, StringType } from './../../domain/StringCleaner';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html'
})
export class MoviedetailsComponent implements OnInit {
  movie: Movie;
  moviesData: FirebaseListObservable<any[]>;

  constructor(db: AngularFireDatabase,
      private router: Router,
      private location: Location,
    ) { 
    
    router.events.subscribe((val) => {

      if(this.router.url.split('/')[1] === 'movies' && this.router.url.split('/')[2]){
        let Path = new StringCleaner(this.router.url, StringType.WithRoute).getCleanString();
        this.moviesData = db.list('/movies',
        {
          query: {
            orderByChild: 'Path',
            equalTo: Path
          }
        });

        this.moviesData.forEach(element => {
          let domainBuilder = new DomainBuilder(element[0], DataType.Movie);
          let domainObject = domainBuilder.getDomainObject();
          this.movie = domainObject;
        }) 
      }
    });
  }

  ngOnInit() {
    
  }

}
