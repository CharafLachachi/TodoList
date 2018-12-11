export class Movie {
    constructor(
        public Title: string,
        public Year: string,
        public imdbID: string, 
        public Type: string,
        public Poster: string) { }
}


export interface IMovieResponse {
    Search: Movie[];
    Response?: string;
}