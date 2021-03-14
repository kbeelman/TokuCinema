import { DomainBuilder, DataType } from '../domain/Builder';
import { StringCleaner, StringType } from '../domain/StringCleaner';
import { BranchData, ImageScreencap, MetaData } from '../domain/Types';

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ListResult, Reference } from '@angular/fire/storage/interfaces';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FirebaseService {
    public cachedData: Array<BranchData> = new Array<BranchData>();

    constructor(
      private db: AngularFireDatabase,
      private fireStorage: AngularFireStorage
    ) {}

    public getBranch(branchName: string): Observable<any> {
      const cachedBranch = this.cachedData.find( (item: BranchData) => item.branchName === branchName);
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
      const itemString: string = itemIsRoute ? this.getPathFromRoute(item) : item;
      return this.db.list('/' + branchName, ref => ref.orderByChild('Path').equalTo(itemString)).valueChanges().pipe(
        map(response => this.extractDomainObject(response, buildType)));
    }

    public getImageMetadata(path: string, branchName: string): Promise<MetaData> {
      return this.fireStorage.storage.ref('images/' + branchName + '/' + path).child('thumb-details.png').getMetadata();
    }

    getImages(branchName: string, path: string, descriptions: Array<string>): Array<ImageScreencap> {
      const returnList: Array<ImageScreencap> = [];
      const imageDirectory: string = branchName === 'media' ? '/screencaps' : '';
      const fullStorageRef: Reference = this.fireStorage.storage.ref('images/' + branchName + '/' + path + imageDirectory + '/full');
      const thumbStorageRef: Reference = this.fireStorage.storage.ref('images/' + branchName + '/' + path + imageDirectory + '/thumbs');

      fullStorageRef.list().then((folderData: ListResult) => {
        folderData.items.forEach((image: Reference, index: number) => {
          returnList.push({ Screencap: '', Thumbnail: '', Description: descriptions[index], Name: image.name });
        });

        folderData.items.forEach((image: Reference) => {
          image.getDownloadURL().then((url: string) => {
            const index: number = this.getImageIndex(returnList, image.name);
            if (index !== -1) {
              const tempItem: ImageScreencap = JSON.parse(JSON.stringify(returnList[index]));
              tempItem.Screencap = url;
              returnList.splice(index, 1, tempItem);
              this.sortImageList(returnList);
            }
          });
        });

        thumbStorageRef.list().then((thumbFolder: ListResult) => {
          thumbFolder.items.forEach((image: Reference) => {
            image.getDownloadURL().then((url: string) => {
              const index: number = this.getImageIndex(returnList, image.name);
              if (index !== -1) {
                const tempItem: ImageScreencap = JSON.parse(JSON.stringify(returnList[index]));
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
      res.forEach((element: any) => {
        if (element) {
          const domainBuilder: DomainBuilder = new DomainBuilder(element, buildType);
          domainObject = domainBuilder.getDomainObject();
        }
      });

      return domainObject;
    }

    private getImageIndex(fileList: Array<ImageScreencap>,
      fileName: string): number {
        let index = -1;
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].Name === fileName) {
            index = i;
          }
        }
        return index;
    }

    private sortImageList(fileList: Array<ImageScreencap>): Array<ImageScreencap> {
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
