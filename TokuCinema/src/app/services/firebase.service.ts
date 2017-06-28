import { Injectable, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
    constructor(
        @Inject(Http) private http: Http,
        private db: AngularFireDatabase
    ) {}

    getMovies(): FirebaseListObservable<any> {
      let item: FirebaseListObservable<any>;

      item = this.db.list('/movies');

      return item;
    }
    getMedia(): FirebaseListObservable<any> {
      let item: FirebaseListObservable<any>;

      item = this.db.list('/media');

      return item;
    }

    /**
     * Handles the error message if the http request fails for some reason.
     * @param error The error coming from the http request
     * @returns {ErrorObservable} Observable exception thrown that will bubble up to the subscriber.
     */
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
