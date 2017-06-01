import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Movie } from '../../domain/Movie';
import { DomainBuilder, DataType } from './../../domain/Builder';

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
        let officialTitle = this.cleanRouteName(this.router.url);
         this.moviesData = db.list('/movies');

        // this.moviesData.forEach(element => {
        //   let domainBuilder = new DomainBuilder(element[0], DataType.Movie);
        //   let domainObject = domainBuilder.getDomainObject();
        //   this.movie = domainObject;
        // }) 
      }
    });
  }

  ngOnInit() {
    // log cleaned route
    console.log(this.cleanRouteName(this.router.url));

    console.log(this.moviesData);

    // this.moviesData.forEach(element => {
    // for (var i = 0; i < element.length; i++) {
    //     let domainBuilder = new DomainBuilder(element[i], DataType.Movie);
    //     let domainObject = domainBuilder.getDomainObject();
    //     this.movie;
    //   }
    // });
  }

  private cleanRouteName(routeName: string): string {
    let cleanName = routeName.split('/')[2]
      .replace(/[^A-Za-z]/g, " ")
      .split(' ');

    if(cleanName.length > 1){
      return cleanName[0] + ' ' + cleanName[cleanName.length-1];
    }
    else {
      return cleanName[0];
    }
  }

}
