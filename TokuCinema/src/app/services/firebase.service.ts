import { DomainBuilder, DataType } from '../domain/Builder';
import { StringCleaner, StringType } from '../domain/StringCleaner';

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListResult } from '@angular/fire/storage/interfaces';

@Injectable()
export class FirebaseService {
    public cachedData: Array<{
          branchName: string;
          data: Observable<any>;
        }> = new Array<{
          branchName: string;
          data: Observable<any>;
        }>();

    constructor(
      private db: AngularFireDatabase,
      private fireStorage: AngularFireStorage
    ) {}

    public getBranch(branchName: string): Observable<any> {
      const cachedBranch = this.cachedData.find( item => item.branchName === branchName);
      if (!cachedBranch) {

        const itemRef: AngularFireList<any> = this.db.list('/' + branchName);
        const item: Observable<any[]> = itemRef.valueChanges();



        // cache for future use
        const branchToCache = { branchName, data: item };
        this.cachedData.push(branchToCache);
        return item;
      } else {
        return cachedBranch.data;
      }
    }

    public getItemFromBranch(item: string, branchName: string, itemIsRoute: boolean, buildType: DataType): Observable<any> {
      const itemString = itemIsRoute ? this.getPathFromRoute(item) : item;
      return this.db.list('/' + branchName, ref => ref.orderByChild('Path').equalTo(itemString)).valueChanges().pipe(
        map(response => this.extractDomainObject(response, buildType)));
    }

    public getImageMetadata(path: string, branchName: string): Promise<any> {
      return this.fireStorage.storage.ref('images/' + branchName + '/' + path).child('thumb-details.png').getMetadata();
    }

    getImages(branchName: string, path: string, descriptions: Array<string>):
      Array<{'Screencap': string; 'Thumbnail': string; 'Description': string; 'Name': string}> {
        const returnList: Array<{'Screencap': string; 'Thumbnail': string; 'Description': string; 'Name': string}> = [];
        const imageDirectory = branchName === 'media' ? '/screencaps' : '';
        const fullStorageRef = this.fireStorage.storage.ref('images/' + branchName + '/' + path + imageDirectory + '/full');
        const thumbStorageRef = this.fireStorage.storage.ref('images/' + branchName + '/' + path + imageDirectory + '/thumbs');

        fullStorageRef.list().then((folderData: ListResult) => {
          folderData.items.forEach((image, index) => {
            returnList.push({ Screencap: '', Thumbnail: '', Description: descriptions[index], Name: image.name });
          });

          folderData.items.forEach(image => {
            image.getDownloadURL().then((url) => {
              const index = this.getImageIndex(returnList, image.name);
              if (index !== -1) {
                const tempItem = JSON.parse(JSON.stringify(returnList[index]));
                tempItem.Screencap = url;
                returnList.splice(index, 1, tempItem);
                this.sortImageList(returnList);
              }
            });
          });

          thumbStorageRef.list().then((thumbFolder: ListResult) => {
            thumbFolder.items.forEach(image => {
              image.getDownloadURL().then((url) => {
                const index = this.getImageIndex(returnList, image.name);
                if (index !== -1) {
                  const tempItem = JSON.parse(JSON.stringify(returnList[index]));
                  tempItem.Thumbnail = url;
                  returnList.splice(index, 1, tempItem);
                  this.sortImageList(returnList);
                }
              });
            });
          });
        });

        return returnList;
    }

    private extractDomainObject(res: any, buildType: DataType): Observable<any> {
      let domainObject: any;
      res.forEach(element => {
        if (element) {
          const domainBuilder = new DomainBuilder(element, buildType);
          domainObject = domainBuilder.getDomainObject();
        }
      });

      return domainObject;
    }

    private getImageIndex(fileList: Array<{'Screencap': string; 'Thumbnail': string; 'Description': string; 'Name': string}>,
      fileName: string): number {
        let index = -1;
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].Name === fileName) {
            index = i;
          }
        }
        return index;
    }

    private sortImageList(fileList: Array<{'Screencap': string; 'Thumbnail': string; 'Description': string; 'Name': string}>):
      Array<{'Screencap': string; 'Thumbnail': string; 'Description': string; 'Name': string}> {
        return fileList.sort((a, b) => {
          if (a.Name < b.Name) {
            return -1;
          } else if (a.Name > b.Name) {
            return 1;
          } else {
            return 0;
          }
        });
    }

    private getPathFromRoute(route: string): string {
      let path = '';

      path = new StringCleaner(route, StringType.WithRoute).getCleanString();

      return path;
    }

}
