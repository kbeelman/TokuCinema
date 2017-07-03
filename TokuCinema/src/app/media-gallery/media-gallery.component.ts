import { Component, Input, Inject, OnInit } from "@angular/core";
import { iGalleryItem } from "./domain/iGalleryItem";
import { GalleryImage } from "./domain/GalleryImage";
import { GalleryVideo } from "./domain/GalleryVideo";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'media-gallery',
    templateUrl: 'templates/media-gallery.component.html'
})

export class MediaGalleryComponent implements OnInit{
    @Input() images: Array<string>;
    @Input() imagesAlt: Array<string>;
    @Input() videoIds: Array<string>;
    galleryImages: Array<GalleryImage> = new Array<GalleryImage>();
    activeItem: iGalleryItem;
    activeItemSource: string | SafeResourceUrl;
    galleryVideos: Array<GalleryVideo> = new Array<GalleryVideo>();
    itemCount: number = 0;

    carouselInterval: number = 34.5;
    currentCarouselMargin: number = 0;
    currentCarouselPosition: number = 0; // index of the left most item shown

    constructor (@Inject(DomSanitizer) private sanitizer: DomSanitizer) {
      console.log("MediaGalleryComponent constructor");
    }

    ngOnInit(): any {
        if(this.shouldInit(this.images)) {
            this.setupImages();
        }
        if(this.shouldInit(this.videoIds)) {
            this.setupVideos();
        }
        this.chooseDefaultActiveItem();
    }

    shouldInit(array: Array<any>) {
        let answer = array && array.length ? true : false;
        return answer;
    }

    setupImages(): void {
        if(this.images.length){
            for (var index = 0; index < this.images.length; index++) {
                let altText: string = this.imagesAlt[index] ? this.imagesAlt[index] : 'gallery image';
                this.galleryImages.push(new GalleryImage(this.images[index], altText, index));
                this.itemCount ++;
            }
        }
    }

    setupVideos(): void {
        if(this.videoIds && this.videoIds.length) {
            for (var index = 0; index < this.videoIds.length; index++) {
                this.galleryVideos.push(new GalleryVideo(this.videoIds[index], index));
                this.itemCount++;
            }
        }
    }

    chooseDefaultActiveItem(): void {
        let imagesExist = this.galleryImages && this.galleryImages.length;
        let videosExist = this.galleryVideos && this.galleryVideos.length;
        if(videosExist) {
            this.setActiveItem(this.galleryVideos[0]);
        }
        else if(imagesExist) {
            this.setActiveItem(this.galleryImages[0]);
        }
    }

    activeItemIsImage(): boolean {
        let answer = this.activeItem.ItemType === ItemType.Image ? true : false;
        return answer;
    }

    activeItemIsVideo(): boolean {
        let answer = this.activeItem.ItemType === ItemType.Video ? true : false;
        return answer;
    }

    setActiveItem(item: iGalleryItem): void {
        if(!this.activeItem || this.activeItem && this.activeItem.GetSource() != item.GetSource()) {
            this.activeItem = item;
            this.setActiveItemSource(item);
        }
    }

    setActiveItemSource(item: iGalleryItem) {
        if(item.ItemType === ItemType.Image) {
            this.activeItemSource = item.GetSource();
        }
        if(item.ItemType = ItemType.Video) {
            this.activeItemSource = this.getTrustedUrl('https://www.youtube.com/embed/' + this.activeItem.GetSource());
        }
    }

    carouselRight(): void {
        let newMargin: number = this.currentCarouselMargin - this.carouselInterval;
        if(this.canCarouselRight()) {
            this.currentCarouselMargin = newMargin;
            this.currentCarouselPosition++;
        }
    }

    carouselLeft(): void {
        let newMargin: number = this.currentCarouselMargin + this.carouselInterval;
        if(this.canCarouselLeft()) {
            this.currentCarouselMargin = newMargin;
            this.currentCarouselPosition--;
        }
    }

    getCurrentCarouselMargin(): string {
        return this.currentCarouselMargin.toString() + "%";
    }

    canCarouselRight(): boolean {
        let imageCount = this.galleryImages && this.galleryImages.length ? this.galleryImages.length : 0;
        let videoCount = this.galleryVideos && this.galleryVideos.length ? this.galleryVideos.length : 0;
        let itemCount = imageCount + videoCount;
        return Math.abs((this.currentCarouselPosition - itemCount)) > 3 ? true : false;
    }

    canCarouselLeft(): boolean {
        return this.currentCarouselPosition != 0 ? true : false;
    }

    getTrustedUrl(sourceUrl: string): SafeResourceUrl {
        let safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);

        return safeUrl;
    }

}

export enum ItemType {
    Image,
    Video
}
