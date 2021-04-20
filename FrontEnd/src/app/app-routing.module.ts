import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {AnimeListComponent} from './anime-list/anime-list.component';
import {FilterComponent} from './filter/filter.component';
import {GenreListComponent} from './genre-list/genre-list.component';
import {CharacterListComponent} from './character-list/character-list.component';
import {CharacterDetailComponent} from './character-detail/character-detail.component';
import {GenreDetailComponent} from './genre-detail/genre-detail.component';
import {AnimeDetailComponent} from './anime-detail/anime-detail.component';

const routes: Routes = [
  {path : '', redirectTo: 'main', pathMatch: 'full'},
  {path : 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'anime', redirectTo: 'anime/filter/', pathMatch: 'full'},
  {path : 'anime/filter/:ids', component: AnimeListComponent},
  {path : 'anime/filter', redirectTo: 'anime/filter/', pathMatch: 'full'},
  {path : 'filter/:ids', component: FilterComponent},
  {path : 'filter', redirectTo: 'filter/', pathMatch: 'full'},
  {path : 'genres', component: GenreListComponent},
  {path : 'genres/:id', component: GenreDetailComponent},
  {path : 'characters', component: CharacterListComponent},
  {path : 'characters/:id', component: CharacterDetailComponent},
  {path : 'anime/:anime_id', component: AnimeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
