import { ItemType } from '../media-gallery.component';
import { iGalleryItem } from "./iGalleryItem";

export class GalleryImage implements iGalleryItem{
    Url: string;
    Alt: string;
    Index: number;
    ItemType: ItemType;

    constructor(url: string, alt: string, index: number) {
        this.Url = url;
        this.Alt = alt;
        this.Index = index;
        this.ItemType = ItemType.Image;
    }

    public GetSource(): string {
        return this.Url;
    }
}
