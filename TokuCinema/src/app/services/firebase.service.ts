import { Injectable, Inject } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { StringCleaner, StringType } from '../../domain/StringCleaner';

@Injectable()
export class FirebaseService {
    constructor(private db: AngularFireDatabase) {}

    getBranch(branchName: string): FirebaseListObservable<any> {
      let item: FirebaseListObservable<any>;

      item = this.db.list('/' + branchName);

      return item;
    }

    getMovieDetails(route: string): FirebaseListObservable<any> {
      let item: FirebaseListObservable<any>;

      item = this.db.list('/media');

      return item;
    }

    getPathFromRoute(route: string): string {
      let path = '';

      path = new StringCleaner(route, StringType.WithRoute).getCleanString();

      return path;
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
