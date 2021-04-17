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
    GenreListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
