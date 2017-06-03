import { ItemType } from './ItemType';

export interface ISearchable {
    getName(): string;
    getType(): ItemType;
    getPath(): string;
}
