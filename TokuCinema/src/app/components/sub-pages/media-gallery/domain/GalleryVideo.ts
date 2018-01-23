import { ItemType } from './ItemType';
import { iGalleryItem } from "./iGalleryItem";

export class GalleryVideo implements iGalleryItem {
    VideoId: string;
    Index: number;
    ItemType: ItemType;

    constructor(videoId: string, index: number) {
        this.VideoId = videoId;
        this.Index = index;
        this.ItemType = ItemType.Video;
    }

    public GetSource(): string {
        return this.VideoId
    }

    public getThumbnailSource(): string {
        let thumbNailUrl = 'https://img.youtube.com/vi/' + this.VideoId + '/1.jpg';
        return thumbNailUrl;
    }
}
