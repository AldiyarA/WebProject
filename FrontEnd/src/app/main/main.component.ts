import { Component, OnInit } from '@angular/core';
import {Anime} from '../models/anime';
import {Genre} from '../models/genre';
import {GenreService} from '../services/genre.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  animeList: Anime[] = [];
  genres: Genre[] = [];
  genre: Genre = undefined;
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  private loadGenres(): void{
    this.genreService.getGenres().subscribe(genres => {this.genres = genres; });
    this.genreService.getGenre(1).subscribe(genre => {
      this.genre = genre;
      this.genreService.getAnimeList(genre.id).subscribe(animeList => {
        this.animeList = animeList;
      });
    });
  }
}
