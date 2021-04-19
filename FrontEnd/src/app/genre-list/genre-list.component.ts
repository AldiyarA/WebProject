import { Component, OnInit } from '@angular/core';
import { Genre } from '../models/genre'
import { GenreService } from '../services/genre.service'

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genres: Genre[];
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

}
