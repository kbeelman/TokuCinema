import { ItemType } from './ItemType';
import { Keyword } from './Keyword';

export interface ISearchable {
    getDisplayName(searchTerm?: string): string;
    getType(): ItemType;
    getPath(): string;
    getKeywords(): Array<Keyword>;
    getIconName(): string;
}
