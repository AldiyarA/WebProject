import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Anime} from '../models/anime';
import {Article} from '../models/article';
import {Genre} from '../models/genre';
import {Character} from '../models/character';
import {GenreService} from '../services/genre.service';
@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css']
})
export class GenreDetailComponent implements OnInit {

  anime: Anime[];
  genre: Genre = undefined;
  managing = false;
  addAnime = false;
  descriptions = [];
  constructor(private route: ActivatedRoute, private router: Router, private genreService: GenreService) { }

  ngOnInit(): void {
    this.loadGenre();
  }
  loadGenre(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('id');
      this.genreService.getGenre(id).subscribe(genre => {
        this.genre = genre;
        this.descriptions = genre.description.split('\n');
        this.loadAnime();
      });
    });
  }
  loadAnime(): void{
    this.genreService.getAnimeList(this.genre.id).subscribe(anime => {
      this.anime = anime;
    });
  }
  addAnimeList(ids: number[]): void{
    this.addAnime = false;
    let loading = 0;
    for (const id of ids){
      loading += 1;
      this.genreService.addAnime(this.genre.id, id).subscribe(() => {
        loading -= 1;
        if (loading === 0){
          this.ngOnInit();
        }
      });
    }
  }
  save(): void{
    this.managing = false;
    this.genreService.updateGenre(this.genre).subscribe(() => {
      this.ngOnInit();
    });
  }
}
