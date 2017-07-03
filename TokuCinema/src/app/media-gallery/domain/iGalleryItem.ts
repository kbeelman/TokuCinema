import { ItemType } from '../media-gallery.component';

export interface iGalleryItem {
    Index: number;
    ItemType: ItemType;

    GetSource(): string;
}
