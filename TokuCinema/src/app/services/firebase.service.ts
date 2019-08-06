import { DomainBuilder, DataType } from '../domain/Builder';
import { StringCleaner, StringType } from '../domain/StringCleaner';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseService {
    public cachedData: Array<{
          branchName: string,
          data: Observable<any>
        }> = new Array<{
          branchName: string,
          data: Observable<any>
        }>();

    constructor(
      private db: AngularFireDatabase
    ) {}

    public getBranch(branchName: string): Observable<any> {
      let cachedBranch = this.cachedData.find( item => item.branchName === branchName);
      if (!cachedBranch) {

        let itemRef: AngularFireList<any>;
        let item: Observable<any[]>;

        itemRef = this.db.list('/' + branchName);
        item = itemRef.valueChanges();

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

      let branchItem = this.db.list('/' + branchName, ref => ref.orderByChild('Path').equalTo(itemString)).valueChanges().pipe(map(response => {
        return this.extractDomainObject(response, buildType);
      }));

      return branchItem;
    }

    private extractDomainObject(res: any, buildType: DataType): Observable<any> {
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

}
