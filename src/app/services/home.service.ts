import { IMovieResponse, Movie } from './../models/movies.class';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private api_url: string;
  private favoriteMovies : Movie[];
  selectedMovies : Movie[];



  constructor(private httpClient: HttpClient) {
    this.api_url = environment.api_url + environment.api_key;
    this.favoriteMovies = [];
    this.selectedMovies = [];
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
                    movie.Poster,
                    false))

              .filter(movie => movie.Title.toLowerCase().includes(name))

            return response;
          }
        })
      );
  }

  public addFavoriteMovie(movie : Movie){
    this.selectedMovies.find(m => m.imdbID == movie.imdbID).favori = true; 

  //  this.favoriteMovies.push(movie);
  //  this.change.emit(this.favoriteMovies);
  }

  public addSelectedMovies(movie : Movie){
    this.selectedMovies.push(movie);
  }

 public getFavoriteMovies(): Movie[]{
  return this.selectedMovies.filter(m => m.favori == true);
  }

 public removeFavorite(movie : Movie){
  this.selectedMovies.find(m => m.favori = false);
  }

  public removeSelected(movie : Movie){
    const index = this.selectedMovies.indexOf(movie, 0);
    if (index > -1) {
       this.selectedMovies.splice(index, 1);
    }
  }
}
