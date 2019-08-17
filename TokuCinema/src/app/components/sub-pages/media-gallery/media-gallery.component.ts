import { Component, Input, Inject, OnInit } from '@angular/core';
import { IGalleryItem } from './domain/IGalleryItem';
import { GalleryImage } from './domain/GalleryImage';
import { GalleryVideo } from './domain/GalleryVideo';
import { ItemType } from './domain/ItemType';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-media-gallery',
    templateUrl: 'templates/media-gallery.component.html'
})

export class MediaGalleryComponent implements OnInit {
    @Input() images: Array<string>;
    @Input() imagesAlt: Array<string>;
    @Input() videoIds: Array<string>;
    galleryImages: Array<GalleryImage> = new Array<GalleryImage>();
    activeItem: IGalleryItem;
    activeItemSource: string | SafeResourceUrl;
    galleryVideos: Array<GalleryVideo> = new Array<GalleryVideo>();
    itemCount: number = 0;
    showItem: boolean = false;

    carouselInterval: number = 100;
    currentCarouselMargin: number = 0;
    currentCarouselPosition: number = 0; // index of the left most item shown

    constructor (@Inject(DomSanitizer) private sanitizer: DomSanitizer) {
    }

    ngOnInit(): any {
        if (this.shouldInit(this.images)) {
            this.setupImages();
        }
        if (this.shouldInit(this.videoIds)) {
            this.setupVideos();
        }
        this.chooseDefaultActiveItem();
    }

    toggleShowItem() {
        this.showItem = !this.showItem;
    }

    shouldInit(array: Array<any>) {
        const answer = array && array.length ? true : false;
        return answer;
    }

    setupImages(): void {
        if (this.images.length) {
            for (let index = 0; index < this.images.length; index++) {
                const altText: string = this.imagesAlt[index] ? this.imagesAlt[index] : 'gallery image';
                this.galleryImages.push(new GalleryImage(this.images[index], altText, index));
                this.itemCount ++;
            }
        }
    }

    setupVideos(): void {
        if (this.videoIds && this.videoIds.length) {
            for (let index = 0; index < this.videoIds.length; index++) {
                this.galleryVideos.push(new GalleryVideo(this.videoIds[index], index));
                this.itemCount++;
            }
        }
    }

    chooseDefaultActiveItem(): void {
        const imagesExist = this.galleryImages && this.galleryImages.length;
        const videosExist = this.galleryVideos && this.galleryVideos.length;
        if (videosExist) {
            this.setActiveItem(this.galleryVideos[0]);
        } else if (imagesExist) {
            this.setActiveItem(this.galleryImages[0]);
        }
    }

    activeItemIsImage(): boolean {
        const answer = this.activeItem.ItemType === ItemType.Image ? true : false;
        return answer;
    }

    activeItemIsVideo(): boolean {
        const answer = this.activeItem.ItemType === ItemType.Video ? true : false;
        return answer;
    }

    setActiveItem(item: IGalleryItem): void {
        if (!this.activeItem || this.activeItem && this.activeItem.GetSource() !== item.GetSource()) {
            this.activeItem = item;
            this.setActiveItemSource(item);
        }
    }

    setActiveItemSource(item: IGalleryItem) {
        if (item.ItemType === ItemType.Image) {
            this.activeItemSource = item.GetSource();
        }
        if (item.ItemType === ItemType.Video) {
            this.activeItemSource = this.getTrustedUrl('https://www.youtube.com/embed/' + this.activeItem.GetSource());
        }
    }

    carouselRight(): void {
        if (this.canCarouselRight()) {
            const imageCount = this.galleryImages && this.galleryImages.length ? this.galleryImages.length : 0;
            const videoCount = this.galleryVideos && this.galleryVideos.length ? this.galleryVideos.length : 0;
            const itemCount = imageCount + videoCount;

            if ((this.currentCarouselPosition + 10) > itemCount) {
                const marginMultiple = itemCount % 5;
                this.currentCarouselMargin = (this.currentCarouselMargin - (marginMultiple * 20));
                this.currentCarouselPosition = this.currentCarouselPosition + marginMultiple;
            } else {
                const newMargin: number = this.currentCarouselMargin - this.carouselInterval;
                this.currentCarouselMargin = newMargin;
                this.currentCarouselPosition = this.currentCarouselPosition + 5;
            }
        }
    }

    carouselLeft(): void {
        if (this.canCarouselLeft()) {
            if (this.currentCarouselPosition < 5) {
                const marginMultiple = this.currentCarouselPosition;
                this.currentCarouselMargin = (this.currentCarouselMargin + (marginMultiple * 20));
                this.currentCarouselPosition = this.currentCarouselPosition - marginMultiple;
            } else {
                const newMargin: number = this.currentCarouselMargin + this.carouselInterval;
                this.currentCarouselMargin = newMargin;
                this.currentCarouselPosition = this.currentCarouselPosition - 5;
            }
        }
    }

    getCurrentCarouselMargin(): string {
        return this.currentCarouselMargin.toString() + '%';
    }

    canCarouselRight(): boolean {
        const imageCount = this.galleryImages && this.galleryImages.length ? this.galleryImages.length : 0;
        const videoCount = this.galleryVideos && this.galleryVideos.length ? this.galleryVideos.length : 0;
        const itemCount = imageCount + videoCount;
        return Math.abs((this.currentCarouselPosition - itemCount)) > 5 ? true : false;
    }

    canCarouselLeft(): boolean {
        return this.currentCarouselPosition !== 0 ? true : false;
    }

    getTrustedUrl(sourceUrl: string): SafeResourceUrl {
        const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);

        return safeUrl;
    }

}
