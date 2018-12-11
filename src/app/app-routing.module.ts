import { FavorisComponent } from './favoris/favoris.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'favoris', component : FavorisComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
