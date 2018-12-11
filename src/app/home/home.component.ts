import { HomeService } from './../services/home.service';
import { IMovieResponse, Movie, MovieDetails } from './../models/movies.class';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { switchMap, debounceTime } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Observable used in autocomplete input
  filteredMovies: Observable<IMovieResponse>;
  moviesForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private homeService: HomeService,
    public dialog: MatDialog) {
  }

  ngOnInit() {

    this.moviesForm = this.formBuilder.group({
      movieInput: null
    })
    // Connect to the api in order to get autocomplete 
    this.filteredMovies = this.moviesForm.get('movieInput').valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value: string) => this.homeService.search(value.toString().toLowerCase()))
      );
  }

  displayFn(movie: Movie) {
    if (movie) { return movie.Title; }
  }
  
  // Add Selected movie from input to homeService
  public setSelectedMovie() {
    let movie: Movie = this.moviesForm.get('movieInput').value;
    this.homeService.addSelectedMovies(movie);
  }
  // Get selected movies from homeService, returned value is binded with forloop in view html
  get selectedMovies(): Movie[] {
    return this.homeService.selectedMovies;
  }
  // Add favorite film to homeService 
  public addFavori(movie: Movie) {
    this.homeService.addFavoriteMovie(movie);
  }
  // Remove favorite film from homeService
  public removeSelected(movie: Movie) {
    this.homeService.removeSelected(movie);
  }


  public openModal(movie: Movie) {
    // Call homeService to get more details about film
    this.homeService.searchMovieDetails(movie.imdbID).subscribe(
      (movieDetails) => {
        //  Open the dialog with fetched details
        const dialogRef = this.dialog.open(DialogMovie, {
          width: '400px',
          data: movieDetails,
          disableClose: false
        });
      }
    )


  }
}

// Modal Component 
@Component({
  selector: 'dialog-movie',
  templateUrl: 'movie.dialog.html',
})
export class DialogMovie {

  constructor(
    public dialogRef: MatDialogRef<DialogMovie>,
    @Inject(MAT_DIALOG_DATA) public data: MovieDetails) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
