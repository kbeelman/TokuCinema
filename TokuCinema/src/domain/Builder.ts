// This is a helper class for converting raw data to domain classes
import { Movie } from './Movie';
import { Media } from './Media';

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

        return domainObject;
    }

    private buildMovie(): Movie {
        let movieData = this.RawData;
        
        let movie: Movie = new Movie(movieData['OfficialTitle'], 
            movieData['AlternateTitles'],
            movieData['OriginalPoster'],
            movieData['ReleaseYear'],
            movieData['ProductionCompany'],
            movieData['CountryOfOrigin'],
            movieData['Languages'],
            movieData['Studio'],
            movieData['Director'],
            movieData['Series'],
            movieData['Era']);

        return movie;
    }

    private buildMedia(): Media {
        let mediaData = this.RawData;
        
        let media: Media = new Media(mediaData['Title'],
            mediaData['JapaneseTitle'],
            mediaData['AspectRatio'],
            mediaData['Runtime'],
            mediaData['Color'],
            mediaData['OriginalRuntime'],
            mediaData['ChapterStops'],
            mediaData['Subtitles'],
            mediaData['Medium'],
            mediaData['Format'],
            mediaData['Region'],
            mediaData['DiskCount'],
            mediaData['ColorSystem'],
            mediaData['Distributor'],
            mediaData['CatalogCode'],
            mediaData['UPC'],
            mediaData['ReleaseDate'],
            mediaData['PurchaseLinks']
        );

        return media;
    }
}

export enum DataType {
    Movie,
    Media
}