import { ItemType } from './ItemType';

export interface IGalleryItem {
    Index: number;
    ItemType: ItemType;
    Url: string;

    GetSource(): string;

    getHost(): string;
}
