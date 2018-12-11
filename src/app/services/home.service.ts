import { IMovieResponse, Movie } from './../models/movies.class';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private api_url: string;
  constructor(private httpClient: HttpClient) {
    this.api_url = environment.api_url + environment.api_key;
  }


  public search(name) {
    return this.httpClient.get<IMovieResponse>(this.api_url + "&s=" + name).
      pipe(
        tap((response: IMovieResponse) => {
          if (response.Response.indexOf("False") == -1) {
            response.Search = response.Search
              .map(movie =>
                new
                  Movie(
                    movie.Title,
                    movie.Year,
                    movie.imdbID,
                    movie.Type,
                    movie.Poster))

              .filter(movie => movie.Title.toLowerCase().includes(name))

            return response;
          }
        })
      );
  }
}
