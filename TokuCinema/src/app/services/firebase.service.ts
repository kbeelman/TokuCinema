import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { StringCleaner, StringType } from '../../domain/StringCleaner';
import { DomainBuilder, DataType } from '../../domain/Builder';
import { Media } from '../../domain/Media';
import { Movie } from '../../domain/Movie';

@Injectable()
export class FirebaseService {
    constructor(
      private db: AngularFireDatabase
    ) {}

    getBranch(branchName: string): FirebaseListObservable<any> {
      let item: FirebaseListObservable<any>;

      item = this.db.list('/' + branchName);

      return item;
    }

    getItemFromBranch(item: string, branchName: string, itemIsRoute: boolean, buildType: DataType): Observable<any> {
      let response: FirebaseListObservable<any>;
      let itemString = itemIsRoute? this.getPathFromRoute(item) : item;

      return this.db.list('/' + branchName,
        {
          query: {
            orderByChild: 'Path',
            equalTo: itemString
          }
        }).map((res: Response) => this.extractDomainObject(res, buildType))
        .catch(this.handleError);
    }

    extractDomainObject(res: Response, buildType: DataType): any {
      let domainBuilder = new DomainBuilder(res[0], buildType);
      let domainObject = domainBuilder.getDomainObject();
      return domainObject;
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
