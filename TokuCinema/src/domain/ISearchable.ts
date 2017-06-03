import { ItemType } from './ItemType';

export interface ISearchable {
    getDisplayName(): string;
    getType(): ItemType;
    getPath(): string;
}
