import { ReviewElement } from './Types';

export class MediaReview {
    constructor(
        public Overview: string,
        public Video: Array<ReviewElement>,
        public Audio: Array<ReviewElement>,
        public Extras: Array<ReviewElement>,
        public Overall: Array<ReviewElement>,
        public FeaturedScreenShots: Array<number>
    ) {}
}
