import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Anime} from '../models/anime';
import {Article} from '../models/article';
import {Genre} from '../models/genre';
import {Character} from '../models/character';
import {AnimeService} from '../services/anime.service';
@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {
  anime: Anime = undefined;
  articles: Article[];
  genres: Genre[];
  characters: Character[];
  managing = false;
  addCharacter = false;
  constructor(private route: ActivatedRoute, private router: Router, private animeService: AnimeService) { }

  ngOnInit(): void {
    this.loadAnime();
  }
  loadAnime(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('anime_id');
      this.animeService.getAnime(id).subscribe(anime => {
        this.anime = anime;
        this.loadArticle();
        this.loadGenre();
        this.loadCharacters();
      });
    });
  }
  save(): void{
    this.managing = false;
  }
  loadArticle(): void{
    this.animeService.getArticles(this.anime.id).subscribe(articles => {
      this.articles = articles;
    });
  }
  loadGenre(): void{
    this.animeService.getGenres(this.anime.id).subscribe(genres => {
      this.genres = genres;
    });
  }
  loadCharacters(): void{
    this.animeService.getCharacters(this.anime.id).subscribe(characters => {
      this.characters = characters;
    });
  }
  updateArticle(article: Article): void{
    this.animeService.updateArticle(this.anime.id, article);
  }

  addCharacters(ids: number[]): void{
    let loading = 0;
    for (const id of ids){
      loading += 1;
      this.animeService.addCharacter(this.anime.id, id).subscribe(() => {
        loading -= 1;
        if (loading === 0){
          this.ngOnInit();
        }
      });
    }
    this.addCharacter = false;
  }
  deleteCharacter(id: number): void{
    console.log(id);
    this.animeService.deleteCharacter(this.anime.id, id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
