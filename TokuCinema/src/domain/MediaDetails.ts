import { ISearchable } from './ISearchable';
import { ItemType } from './ItemType';

export class MediaDetails {
    constructor(
        public Medium: string,
        public Title: string,
        public TitleJapanese: string,
        public MainFeatureInfo: Array<string>,
        public DiscInfo: Array<string>,
        public DistributionInfo: Array<string>,
        public PurchaseLinks: Array<string>
    ) {}

}
