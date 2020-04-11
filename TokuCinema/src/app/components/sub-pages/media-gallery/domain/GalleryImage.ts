import { ItemType } from './ItemType';
import { IGalleryItem } from './IGalleryItem';

export class GalleryImage implements IGalleryItem {
    Url: string;
    Thumb: string;
    Alt: string;
    Index: number;
    ItemType: ItemType;

    constructor(url: string, thumb: string, alt: string, index: number) {
        this.Url = url;
        this.Thumb = thumb;
        this.Alt = alt;
        this.Index = index;
        this.ItemType = ItemType.Image;
    }

    public GetSource(): string {
        return this.Url;
    }
}
