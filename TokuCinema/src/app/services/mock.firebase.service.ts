import { DataType, DomainBuilder } from '../domain/Builder';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { stubGodzillaMedia } from './stub-data/stubGodzillaMedia';
import { stubGodzillaMovie } from './stub-data/stubGodzillaMovie';
import { stubGodzillaMovieAlternateVersion } from './stub-data/stubGodzillaMovieAlternateVersion';
import { Media } from '../domain/Media';
import { Movie } from '../domain/Movie';
import { MovieAlternateVersion } from '../domain/MovieAlternateVersion';

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

  public getBranch(_branchName: string): Observable<any> {
    return new Observable((observer) => {
      let response: any;
      response = {};
      observer.next(response);
      observer.complete();
    });
  }

  public getItemFromBranch(_item: string, _branchName: string, _itemIsRoute: boolean, buildType: DataType): Observable<any> {
    return new Observable((observer) => {
      let response: any;
      response = {};

      if (buildType === DataType.Media) {
        observer.next(new DomainBuilder(stubGodzillaMedia, DataType.Media).getDomainObject<Media>());
      } else if (buildType === DataType.Movie) {
        observer.next(new DomainBuilder(stubGodzillaMovie, DataType.Movie).getDomainObject<Movie>());
      } else if (buildType === DataType.MovieAlternateVersion) {
        observer.next(new DomainBuilder(stubGodzillaMovieAlternateVersion, DataType.MovieAlternateVersion)
          .getDomainObject<MovieAlternateVersion>());
      } else {
        observer.next(response);
      }

      observer.complete();
    });
  }

  public getImageMetadata(_path: string, _branchName: string): Observable<any> {
    return new Observable((observer) => {
      let response: any;
      response = {};
      observer.next(response);
      observer.complete();
    });
  }
}
