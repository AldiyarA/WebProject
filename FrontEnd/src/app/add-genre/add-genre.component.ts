import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Genre} from '../models/genre';
import {GenreService} from '../services/genre.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {
  genres: Genre[] = [];
  checkedGenres = {};
  @Output() addGenres = new EventEmitter();
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.loadGenres();
  }
  private loadGenres(): void{
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
      for (const genre of genres){
        this.checkedGenres[genre.id] = false;
      }
    });
  }
  submit(): void{
    const ids = [];
    for (const genre of this.genres){
      if (this.checkedGenres[genre.id]){
        ids.push(genre.id);
      }
    }
    console.log(ids);
    this.addGenres.emit(ids);
  }
}
