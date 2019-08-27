import { DataType, DomainBuilder } from '../domain/Builder';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stubGodzillaMedia } from './stub-data/stubGodzillaMedia';
import { stubGodzillaMovie } from './stub-data/stubGodzillaMovie';
import { stubGodzillaMovieAlternateVersion } from './stub-data/stubGodzillaMovieAlternateVersion';

@Injectable()
export class MockFirebaseService {
  public cachedData: Array<{
    branchName: string,
    data: Observable<any>
  }> = new Array<{
    branchName: string,
    data: Observable<any>
  }>();

  constructor() { }

  public getBranch(branchName: string): Observable<any> {
    return Observable.create((observer) => {
      let response: any;
      response = {};
      observer.next(response);
      observer.complete();
    });
  }

  public getItemFromBranch(item: string, branchName: string, itemIsRoute: boolean, buildType: DataType): Observable<any> {
    return Observable.create((observer) => {
      let response: any;
      response = {};
      // tslint:disable: max-line-length

      if (buildType === DataType.Media) {
        observer.next(new DomainBuilder(stubGodzillaMedia, DataType.Media).getDomainObject());
      } else if (buildType === DataType.Movie) {
        observer.next(new DomainBuilder(stubGodzillaMovie, DataType.Movie).getDomainObject());
      } else if (buildType === DataType.MovieAlternateVersion) {
        observer.next(new DomainBuilder(stubGodzillaMovieAlternateVersion, DataType.MovieAlternateVersion).getDomainObject());
      } else {
        observer.next(response);
      }

      observer.complete();
    });
  }

  public getImageMetadata(path: string, branchName: string): Observable<any> {
    return Observable.create((observer) => {
      let response: any;
      response = {};
      observer.next(response);
      observer.complete();
    });
  }
}
