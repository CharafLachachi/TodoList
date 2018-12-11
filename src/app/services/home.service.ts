import { IMovieResponse, Movie, MovieDetails, IMovieDetailsResponse } from './../models/movies.class';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // The mbDb api url, 
  private api_url: string;
  // The array where selected movies are stocked, 
  // I choose to add a field (favori : boolean) in Movie object, instead of using two arrays
  // one for selected movies and one for favorite movies 
  selectedMovies : Movie[];



  constructor(private httpClient: HttpClient) {
    this.api_url = environment.api_url + environment.api_key;
    this.selectedMovies = [];
  }

  // Get searching result from Api, used in autocomplete
  public search(name) {
    return this.httpClient.get<IMovieResponse>(this.api_url + "&s=" + name).
      pipe(
        tap(
          (response: IMovieResponse) => {
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
        },
        (error) => {
          console.log("Somthing goes wrong !!",error);
        })
        )
  }
  // Get more details about a movie searched by imdbId
  public searchMovieDetails(imdbID : string){
    return this.httpClient.get<IMovieDetailsResponse>(this.api_url + "&i=" + imdbID).
      pipe(
        tap(
          (response: IMovieDetailsResponse) => {
          if (response.Response.indexOf("False") == -1) {
            console.log("service 1",response);
              response = 
                new
                MovieDetails(
                  response.Title,
                  response.Year,
                  response.imdbID,
                  response.Type,
                  response.Poster,
                    false,
                    response.Director,
                    response.Released,
                    response.Runtime)
                    console.log("service 1",response);
            return response;
          }
        },
        (error) => {
          console.log("Somthing goes wrong !!",error);
        })
      );
  }
  // Add favorite movie
  public addFavoriteMovie(movie : Movie){
    // Search in selectedMovies which movie has movie.imdbId, and turn the favori flag to true.
    this.selectedMovies.find(m => m.imdbID == movie.imdbID).favori = true; 
  }

  public addSelectedMovies(movie : Movie){
    this.selectedMovies.push(movie);
  }

 public getFavoriteMovies(): Movie[]{
   // Return all selected movie with the flag favori value as true
  return this.selectedMovies.filter(m => m.favori == true);
  }

 public removeFavorite(movie : Movie){
  // Search in selectedMovies which movie has movie.imdbId, and turn the favori flag to false.
  this.selectedMovies.find(m => m.imdbID == movie.imdbID).favori = false;
  }

  // Remove movie from selectedMovies
  public removeSelected(movie : Movie){
    const index = this.selectedMovies.indexOf(movie, 0);
    if (index > -1) {
       this.selectedMovies.splice(index, 1);
    }
  }
}
