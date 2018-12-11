import { HomeService } from './../services/home.service';
import { Movie } from './../models/movies.class';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent  {

  constructor(private homeService : HomeService) { 
  }

  // Get favorite movies from homeService, 
  //I choose services to share variables between components
  get favoriteMovies():Movie[] { 
    return this.homeService.getFavoriteMovies(); 
  } 

  public removeFavori(movie){
    this.homeService.removeFavorite(movie);
  }

}
