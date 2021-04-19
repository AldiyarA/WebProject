import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Genre } from '../models/genre';
import { GenreService } from '../services/genre.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  genres: Genre[];
  checkedGenres: object;
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private genreService: GenreService
  ) {
    this.checkedGenres = {};
  }

  ngOnInit(): void {
    this.loadGenres();
  }

  getGenres(): void {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  loadGenres(): void{
    this.getGenres();
    this.clear();

    this.route.paramMap.subscribe((param) => {
      const idsString = param.get('ids');
      if (!idsString) return;

      idsString.split('-').forEach(i => {
        this.checkedGenres[+i] = true;
      });
    });
  }

  submit(): void{
    const activeGenres = this.genres.filter(genre => this.checkedGenres[genre.id]).map(genre => genre.id);
    const s = activeGenres.join('-');
    this.router.navigate(['/anime', 'filter', s]);
  }

  clear(): void{
    this.genres.forEach(genre => {
      this.checkedGenres[genre.id] = false;
    });
  }
}
