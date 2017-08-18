import { element } from 'protractor';
import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { StringCleaner, StringType } from '../domain/StringCleaner';
import { DomainBuilder, DataType } from '../domain/Builder';
import { Media } from '../domain/Media';
import { Movie } from '../domain/Movie';

@Injectable()
export class FirebaseService {
    public cachedData: Array<{
          branchName: string,
          data: FirebaseListObservable<any>
        }> = new Array<{
          branchName: string,
          data: FirebaseListObservable<any>
        }>();

    constructor(
      private db: AngularFireDatabase
    ) {}

    public getBranch(branchName: string): FirebaseListObservable<any> {
      let cachedBranch = this.cachedData.find( item => item.branchName === branchName);
      if (!cachedBranch) {
        let item: FirebaseListObservable<any>;

        item = this.db.list('/' + branchName);

        // cache for future use
        let branchToCache = {branchName: branchName, data: item};
        this.cachedData.push(branchToCache);
        return item;
      } else {
        return cachedBranch.data;
      }
    }

    public getItemFromBranch(item: string, branchName: string, itemIsRoute: boolean, buildType: DataType): Observable<any> {
      let itemString = itemIsRoute? this.getPathFromRoute(item) : item;

      return this.db.list('/' + branchName,
      {
        query: {
          orderByChild: 'Path',
          equalTo: itemString
        }
      }).map(response => {
        return this.extractDomainObject(response, buildType);
      });

    }

    private extractDomainObject(res: FirebaseListObservable<any>, buildType: DataType): Observable<any> {
      let domainObject: any;
      res.forEach(element => {
        if(element) {
          let domainBuilder = new DomainBuilder(element, buildType);
          domainObject = domainBuilder.getDomainObject();
        }
      });

      return domainObject;
    }

    private getPathFromRoute(route: string): string {
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
