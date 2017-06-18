// This is a helper class for converting raw data to domain classes
import { Movie } from './Movie';
import { Media } from './Media';
import { MediaReview } from './MediaReview';

export class DomainBuilder {
    public RawData: any;
    public DataType: DataType;

    constructor(data: any, dataType: DataType) {
        this.RawData = data;
        this.DataType = dataType;
    }

    public getDomainObject(): any {
        let domainObject: any;

        if (this.DataType === DataType.Media) {
            domainObject = this.buildMedia();
        }
        else if (this.DataType === DataType.Movie) {
            domainObject = this.buildMovie();
        }
        else if (this.DataType === DataType.MediaReview) {
            domainObject = this.buildMediaReview();
        }

        return domainObject;
    }

    private buildMovie(): Movie {
        let movieData = this.RawData;
        
        let movie: Movie = new Movie(
            movieData['OfficialTitle'], 
            movieData['AlternateTitles'],
            movieData['OriginalPoster'],
            movieData['ReleaseYear'],
            movieData['ProductionCompany'],
            movieData['CountryOfOrigin'],
            movieData['Languages'],
            movieData['Distributor'],
            movieData['Director'],
            movieData['Series'],
            movieData['Era'],
            movieData['Path']);

        return movie;
    }

    private buildMedia(): Media {
        let mediaData = this.RawData;
        
        let media: Media = new Media(
            mediaData['Title'],
            mediaData['JapaneseTitle'],
            mediaData['AspectRatio'],
            mediaData['Runtime'],
            mediaData['Color'],
            mediaData['OriginalRuntime'],
            mediaData['ChapterStops'],
            mediaData['Subtitles'],
            mediaData['SubtitlesDetails'],
            mediaData['AudioTracks'],
            mediaData['AudioTracksDetails'],
            mediaData['Medium'],
            mediaData['Format'],
            mediaData['Region'],
            mediaData['Country'],
            mediaData['DiskCount'],
            mediaData['ColorSystem'],
            mediaData['Screencaps'],
            mediaData['Distributor'],
            mediaData['CatalogCode'],
            mediaData['UPC'],
            mediaData['ReleaseDate'],
            mediaData['PurchaseLinks'],
            mediaData['MoviePath'],
            mediaData['OriginalRelease'],
            mediaData['BoxArt'],
            mediaData['Path'],
            []
        );

        return media;
    }

    private buildMediaReview(): MediaReview {
        let mediaReviewData = this.RawData;

        let mediaReview: MediaReview = new MediaReview(
            mediaReviewData['Overview'],
            mediaReviewData['Video'],
            mediaReviewData['Audio'],
            mediaReviewData['Extras'],
            mediaReviewData['Overall'],
            mediaReviewData['FeaturedScreenShots'],
        );

        return mediaReview;
    }
}

export enum DataType {
    Movie,
    Media,
    MediaReview
}