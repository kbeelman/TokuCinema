import { ItemType } from './ItemType';

export interface iGalleryItem {
    Index: number;
    ItemType: ItemType;

    GetSource(): string;
}
