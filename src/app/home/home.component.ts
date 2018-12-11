import { HomeService } from './../services/home.service';
import { IMovieResponse, Movie } from './../models/movies.class';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {switchMap, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   filteredMovies: Observable<IMovieResponse>;
   moviesForm: FormGroup;
   selectedMovies : Movie[];

  constructor(private formBuilder : FormBuilder,
    private homeService : HomeService) { 
    console.log('home');
   
  
  }

  ngOnInit() {
    this.selectedMovies = [];

    this.moviesForm = this.formBuilder.group({
      movieInput : null
    })

    this.filteredMovies = this.moviesForm.get('movieInput').valueChanges
    .pipe(
      debounceTime(300),
      switchMap((value : string) => this.homeService.search(value.toString().toLowerCase()))
    );
  }

  displayFn(movie: Movie) {
    if (movie) { return movie.Title; }
  }

  onSubmit(){
    let movie : Movie = this.moviesForm.get('movieInput').value;
    console.log(movie);
    this.selectedMovies.push(movie)
  }

}
