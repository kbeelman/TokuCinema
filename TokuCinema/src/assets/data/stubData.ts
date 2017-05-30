import { Country, Language, Series, Era, ColorType, ColorSystem, AspectRatio, Format, Medium } from '../../domain/Types';
import { Movie } from '../../domain/Movie';
import { Media } from '../../domain/Media';

export const stubMovies = new Array<Movie>();
stubMovies.push(
    new Movie("Godzilla", ["Gojira"], "https://upload.wikimedia.org/wikipedia/en/2/29/Godzilla_%2754_design.jpg",
        1954, "Toho", "Japan", ["Japanese", "English"], "Toho", "Honda",
        "Godzilla", "Showa")
);
stubMovies.push(
    new Movie("Godzilla 1984 - The Return of Godzilla", ["Godzilla 1985"], "http://vignette4.wikia.nocookie.net/godzilla/images/d/d9/The_Return_of_Godzilla_Poster_Japan_1.png/revision/latest?cb=20140526033533",
        1984, "Toho", "Japan", ["Japanese", "English"], "Toho", "Honda",
        "Godzilla", "Heisei")
);
stubMovies.push(
    new Movie("Godzilla vs Biollante", [], "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/GodzillaBiollante.jpg/220px-GodzillaBiollante.jpg",
        1986, "Toho", "Japan", ["Japanese", "English"], "Toho", "Honda",
        "Godzilla", "Heisei")
);

export const stubMedia = new Array<Media>();
stubMedia.push(
    new Media("Godzilla", "Gojira", "4:3", 93, "Black & White", 93, [{"Version": "English", "Count": 1}],
    ["English", "Japanese"], "VHS", "Single Sided", 1, 1, "NTSC", "Toho", "123",
    "123123123123", new Date("1954-01-01"), ["https://www.amazon.com/Gojira-Godzilla-Monsters-Akira-Takarada/dp/B000FA4TLQ/ref=sr_1_5?ie=UTF8&qid=1496107559&sr=8-5&keywords=Godzilla+1954"])
);
stubMedia.push(
    new Media("Godzilla 1984 - The Return of Godzilla", "", "4:3", 93, "Black & White", 93, [{"Version": "English", "Count": 1}],
    ["English", "Japanese"], "VHS", "Single Sided", 1, 1, "NTSC", "Toho", "123",
    "123123123123", new Date('1984-01-01'), ["https://www.amazon.com/Return-Godzilla-Blu-ray-Koji-Hashimoto/dp/B01FZ8I7R4/ref=sr_1_1?ie=UTF8&qid=1496107850&sr=8-1&keywords=Godzilla+1984"])
);
stubMedia.push(
    new Media("Godzilla vs Biollante", "", "4:3", 93, "Black & White", 93, [{"Version": "English", "Count": 1}],
    ["English", "Japanese"], "VHS", "Single Sided", 1, 1, "NTSC", "Toho", "123",
    "123123123123", new Date('1986-01-01'), ["https://www.amazon.com/Return-Godzilla-Blu-ray-Koji-Hashimoto/dp/B01FZ8I7R4/ref=sr_1_1?ie=UTF8&qid=1496107850&sr=8-1&keywords=Godzilla+1984"])
);
