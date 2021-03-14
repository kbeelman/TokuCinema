// This is a helper class for converting raw data to domain classes
import { Movie } from './Movie';
import { Media } from './Media';
import { MediaReview } from './MediaReview';
import { MovieAlternateVersion } from './MovieAlternateVersion';

export class DomainBuilder {
    public RawData: any;
    public DataType: DataType;

    constructor(data: any, dataType: DataType) {
        this.RawData = data;
        this.DataType = dataType;
    }

    public getDomainObject<T>(): T {
        let domainObject: any;

        if (this.DataType === DataType.Media) {
            domainObject = this.buildMedia();
        } else if (this.DataType === DataType.Movie) {
            domainObject = this.buildMovie();
        } else if (this.DataType === DataType.MediaReview) {
            domainObject = this.buildMediaReview();
        } else if (this.DataType === DataType.MovieAlternateVersion) {
            domainObject = this.buildMovieAlternateVersion();
        }

        return domainObject;
    }

    private buildMovie(): Movie {
        const movieData = this.RawData;

        return new Movie(
            movieData.OfficialTitle,
            movieData.AlternateTitles,
            movieData.OriginalPoster,
            movieData.ReleaseDate,
            movieData.ProductionCompany,
            movieData.CountryOfOrigin,
            movieData.Languages,
            movieData.Distributor,
            movieData.Director,
            movieData.Series,
            movieData.Era,
            movieData.Runtime,
            movieData.Crew,
            movieData.Cast,
            movieData.Path,
            movieData.Videos);
    }

    private buildMovieAlternateVersion(): MovieAlternateVersion {
        const altVerData = this.RawData;

        return new MovieAlternateVersion(
            altVerData.Path,
            altVerData.Countries
        );
    }

    private buildMedia(): Media {
        const mediaData = this.RawData;

        return Media.createMedia(
            mediaData.Title,
            mediaData.AspectRatio,
            mediaData.Runtime,
            mediaData.Color,
            mediaData.ChapterStops,
            mediaData.Subtitles,
            mediaData.SubtitlesDetails,
            mediaData.AudioTracks,
            mediaData.AudioTracksDetails,
            mediaData.Medium,
            mediaData.Format,
            mediaData.Region,
            mediaData.Country,
            mediaData.MediumCount,
            mediaData.ColorSystem,
            mediaData.ScreencapDescriptions,
            mediaData.Distributor,
            mediaData.CatalogCode,
            mediaData.UPC,
            mediaData.ReleaseDate,
            mediaData.PurchaseLinks,
            mediaData.MoviePath,
            mediaData.OriginalRelease,
            mediaData.BoxArt,
            mediaData.Path,
            []
        );
    }

    private buildMediaReview(): MediaReview {
        const mediaReviewData = this.RawData;

        return new MediaReview(
            mediaReviewData.Overview,
            mediaReviewData.Video,
            mediaReviewData.Audio,
            mediaReviewData.Extras,
            mediaReviewData.Overall,
            mediaReviewData.FeaturedScreenShots,
        );
    }
}

export enum DataType {
    Movie,
    Media,
    MediaReview,
    MovieAlternateVersion
}
