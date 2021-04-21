import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';
import { FilterComponent } from './filter/filter.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { ArticleComponent } from './article/article.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AddCharactersComponent } from './add-characters/add-characters.component';
import {AuthInterceptor} from './services/AuthInterceptor';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    AnimeListComponent,
    AnimeDetailComponent,
    FilterComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    MainComponent,
    LoginComponent,
    GenreListComponent,
    GenreDetailComponent,
    ArticleComponent,
    AddCharactersComponent,
    AddGenreComponent,
    AddAnimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
