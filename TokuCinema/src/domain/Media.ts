export class Media {
    constructor(
        // Main Feature Info
        AspectRatio: AspectRatio,
        Runtime: number,
        Color: ColorType,
        OriginalRuntime: number,
        ChapterStops: Array<{"Vesion": string, "Count": number}>,
        Subtitles: Array<Language>,
        // Disc Information
        Medium: MediumType,

    ) {

    }
}

export enum AspectRatio {
    "4:3",
    "16:9",
}

export enum ColorType {
    "Black & White",
    "Color"
}

export enum Language {
    "English",
    "Japanese",
    "German",
    "French",
    "Korean"
}

export enum MediumType {
    "DVD",
    "VHS",
    "Blu-Ray"
}

export enum Format {
    "Single Sided",
    "Dual-Layer"
}