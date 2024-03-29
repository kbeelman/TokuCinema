import { IGalleryItem } from './domain/iGalleryItem';
import { GalleryImage } from './domain/GalleryImage';
import { GalleryVideo } from './domain/GalleryVideo';
import { ItemType } from './domain/ItemType';
import { ImageScreencap, VideoScreencap } from '../../../domain/Types';

import { Component, Input, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-media-gallery',
    templateUrl: 'media-gallery.component.html'
})

export class MediaGalleryComponent {
    @Input() images: Array<ImageScreencap> = [];
    @Input() videoIds: Array<VideoScreencap> = [];
    @Input() numberOfImages: number = 0;
    galleryImages: Array<GalleryImage> = new Array<GalleryImage>();
    activeItem: IGalleryItem;
    activeItemSource: string | SafeResourceUrl = '';
    galleryVideos: Array<GalleryVideo> = new Array<GalleryVideo>();
    itemCount: number = 0;
    showItem: boolean = false;

    carouselInterval: number = 100;
    currentCarouselMargin: number = 0;
    currentCarouselPosition: number = 0; // index of the left most item shown

    initInterval: NodeJS.Timeout;
    elapsedTime: number = 0;

    constructor(
        @Inject(DomSanitizer) private sanitizer: DomSanitizer
    ) {
        this.initInterval = setInterval(() => {
            if (this.shouldInit(this.images)) {
                this.setupImages();
            }
            if (this.shouldInit(this.videoIds)) {
                this.setupVideos();
            }
            this.chooseDefaultActiveItem();

            this.elapsedTime = this.elapsedTime + 500;
            if (!this.isGalleryStillLoading()) {
                clearInterval(this.initInterval);
            }
        }, 500);
    }

    toggleShowItem() {
        this.showItem = !this.showItem;
    }

    shouldInit(array: Array<any>) {
        return array && array.length ? true : false;
    }

    setupImages(): void {
        if (this.images.length) {
            for (let index = 0; index < this.images.length; index++) {
                const altText: string = this.images[index]?.Description ? this.images[index].Description : '';
                const thumbnail: string = this.images[index].Thumbnail ? this.images[index].Thumbnail : this.images[index].Screencap;

                const loadingStatus = this.doesGalleryContainImage(index);

                if (loadingStatus.foundIndex > -1) {
                    this.galleryImages.splice(loadingStatus.foundIndex, 1,
                        new GalleryImage(this.images[index].Screencap, thumbnail, altText, index));
                } else if (!loadingStatus.found) {
                    this.galleryImages.push(new GalleryImage(this.images[index].Screencap, thumbnail, altText, index));
                    this.itemCount++;
                }
            }
        }
    }

    isGalleryStillLoading(): boolean {
        let stillLoading = true;
        if (this.numberOfImages > 0) {
            if (this.images) {
                if (this.galleryImages && this.galleryImages.length < this.images.length) {
                    return stillLoading;
                }
                stillLoading = false;
                this.galleryImages.forEach((galleryImage: GalleryImage) => {
                    if (galleryImage.Alt === '' || galleryImage.Url === '' ||
                        galleryImage.Thumb === '') {
                        stillLoading = true;
                    }
                });
            } else {
                return stillLoading;
            }
        } else if (this.elapsedTime < 500) {
            return stillLoading;
        } else {
            stillLoading = false;
            return stillLoading;
        }

        return stillLoading;
    }

    setupVideos(): void {
        if (this.videoIds && this.videoIds.length) {
            for (let index = 0; index < this.videoIds.length; index++) {
                let found = false;
                this.galleryVideos.forEach((galleryVideo: GalleryVideo) => {
                    if (this.videoIds[index].ID === galleryVideo.VideoId) {
                        found = true;
                    }
                });
                if (!found) {
                    this.galleryVideos.push(new GalleryVideo(this.videoIds[index].Host,
                        this.videoIds[index].ID, index, this.videoIds[index].Description));
                    this.itemCount++;
                }
            }
        }
    }

    chooseDefaultActiveItem(): void {
        const imagesExist: boolean = this.galleryImages && this.galleryImages.length > 0;
        const videosExist: boolean = this.galleryVideos && this.galleryVideos.length > 0;
        if (videosExist) {
            this.setActiveItem(this.galleryVideos[0]);
        } else if (imagesExist) {
            this.setActiveItem(this.galleryImages[0]);
        }
    }

    activeItemIsImage(): boolean {
        return this.activeItem.ItemType === ItemType.Image ? true : false;
    }

    activeItemIsVideo(): boolean {
        return this.activeItem.ItemType === ItemType.Video ? true : false;
    }

    setActiveItemFromUrl(url: string): void {
        let galleryItem: IGalleryItem | undefined;
        let foundItem: boolean = false;
        let index: number = 0;
        while (index < this.galleryImages.length && !foundItem) {
            if (this.galleryImages[index].GetSource() === url) {
                galleryItem = this.galleryImages[index];
                foundItem = true;
            } else {
                index++;
            }
        }
        if (galleryItem !== undefined) {
            this.setActiveItem(galleryItem);
        }
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
            if (item.getHost() === 'YT') {
                this.activeItemSource = this.getTrustedUrl('https://www.youtube.com/embed/' + this.activeItem.GetSource());
            } else if (item.getHost() === 'DM') {
                this.activeItemSource = this.getTrustedUrl('https://www.dailymotion.com/embed/video/' +
                    this.activeItem.GetSource() + '?queue-enable=false');
            }
        }
    }

    carouselRight(): void {
        if (this.canCarouselRight()) {
            const imageCount: number = this.galleryImages && this.galleryImages.length ? this.galleryImages.length : 0;
            const videoCount: number = this.galleryVideos && this.galleryVideos.length ? this.galleryVideos.length : 0;
            const itemCount: number = imageCount + videoCount;

            if ((this.currentCarouselPosition + 10) > itemCount) {
                const marginMultiple: number = itemCount % 5;
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
                const marginMultiple: number = this.currentCarouselPosition;
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
        const imageCount: number = this.galleryImages && this.galleryImages.length ? this.galleryImages.length : 0;
        const videoCount: number = this.galleryVideos && this.galleryVideos.length ? this.galleryVideos.length : 0;
        const itemCount: number = imageCount + videoCount;
        return Math.abs((this.currentCarouselPosition - itemCount)) > 5 ? true : false;
    }

    canCarouselLeft(): boolean {
        return this.currentCarouselPosition !== 0 ? true : false;
    }

    private getTrustedUrl(sourceUrl: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(sourceUrl);
    }

    private doesGalleryContainImage(index: number): { foundIndex: number; found: boolean } {
        let foundIndex = -1;
        let found = false;
        for (let subIndex = 0; subIndex < this.galleryImages.length; subIndex++) {
            if (this.galleryImages[subIndex].Url === this.images[index].Screencap ||
                this.galleryImages[subIndex].Thumb === this.images[index].Thumbnail ||
                this.galleryImages[subIndex].Alt === this.images[index].Description) {
                found = true;
                    if (this.galleryImages[subIndex].Alt === '' || this.galleryImages[subIndex].Url === '' ||
                        this.galleryImages[subIndex].Thumb === '') {
                        foundIndex = subIndex;
                    }
                }
        }

        return { foundIndex, found };
    }
}
