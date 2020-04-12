import { ItemType } from './ItemType';

export interface IGalleryItem {
    Index: number;
    ItemType: ItemType;

    GetSource(): string;

    getHost(): string;
}
