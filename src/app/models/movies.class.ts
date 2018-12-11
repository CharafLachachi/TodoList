export class Movie {
    constructor(
        public Title: string,
        public Year: string,
        public imdbID: string, 
        public Type: string,
        public Poster: string,
        public favori?:boolean) { }
}


export interface IMovieResponse {
    Search: Movie[];
    Response?: string;
}

export interface IMovieDetailsResponse {
         Title: string;
         Year: string;
         imdbID: string;
         Type: string;
         Poster: string;
         favori?:boolean;
         Director?: string;
         Released ?: string;
         Runtime ? : string;
         Response ?: string;
}

export class MovieDetails extends Movie   {
    constructor(
        public Title: string,
        public Year: string,
        public imdbID: string, 
        public Type: string,
        public Poster: string,
        public favori?:boolean,
        public Director?: string,
        public Released ?: string,
        public Runtime ? : string

    ){
        super(Title,Year,imdbID,Type,Poster,favori);

    }
}