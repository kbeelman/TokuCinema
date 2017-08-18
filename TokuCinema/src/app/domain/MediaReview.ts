import { StringCleaner, StringType } from './StringCleaner';
import { ItemType } from './ItemType';

export class MediaReview {
    constructor(
        public Overview: string,
        public Video: Array<{"Score": number, "Description": number}>,
        public Audio: Array<{"Score": number, "Description": number}>,
        public Extras: Array<{"Score": number, "Description": number}>,
        public Overall: Array<{"Score": number, "Description": number}>,
        public FeaturedScreenShots: Array<number>
    ){}
}