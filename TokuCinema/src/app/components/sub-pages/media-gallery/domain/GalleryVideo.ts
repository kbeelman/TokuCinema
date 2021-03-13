import { ItemType } from './ItemType';
import { IGalleryItem } from './iGalleryItem';

export class GalleryVideo implements IGalleryItem {
    VideoId: string;
    Index: number;
    ItemType: ItemType;
    Host: string;
    Alt: string;
    Url: string;

    constructor(host: string, videoId: string, index: number, alt: string) {
        this.VideoId = videoId;
        this.Index = index;
        this.ItemType = ItemType.Video;
        this.Host = host;
        this.Alt = alt;
        this.Url = this.getThumbnailSource();
    }

    public GetSource(): string {
        return this.VideoId;
    }

    public getHost(): string {
        return this.Host;
    }

    private getThumbnailSource(): string {
        let thumbNailUrl;
        if (this.Host === 'YT') {
            thumbNailUrl = 'https://img.youtube.com/vi/' + this.VideoId + '/mqdefault.jpg';
        } else if (this.Host === 'DM') {
            thumbNailUrl = 'https://www.dailymotion.com/thumbnail/video/' + this.VideoId;
        } else {
            /** @todo - Make a thumbnail for unknown sources */
            return '';
        }

        return thumbNailUrl;
    }
}
