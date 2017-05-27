import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class MediaDetails implements ISearchable {
    constructor(
        public Title: string,
        public TitleJapanese: string,
        public MainFeatureInfo: Array<string>,
        public DiscInfo: Array<string>,
        public DistributionInfo: Array<string>,
        public PurchaseLinks: Array<string>
    ) {}

    getName(): string {
        return this.Title;
    }

    getType(): ItemType {
        return ItemType.Media;
    }
}
