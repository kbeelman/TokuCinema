import { ItemType } from './ItemType';
import { Keyword } from './Keyword';

export interface ISearchable {
    getDisplayName(): string;
    getType(): ItemType;
    getPath(): string;
    getKeywords(): Array<Keyword>;
}
