import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Anime} from '../models/anime';
import {Article} from '../models/article';
import {Genre} from '../models/genre';
import {Character} from '../models/character';
import {AnimeService} from '../services/anime.service';
import {AnimeArticleService} from '../services/article.service';
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
  addGenre = false;
  descriptions = [];
  logged = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private animeService: AnimeService,
              private articleService: AnimeArticleService) { }

  ngOnInit(): void {
    this.loadData();
    window.scrollTo(0, 0);
  }
  loadData(): void{
    const token = localStorage.getItem('token');
    if (token){
      this.logged = true;
    }
    this.loadAnime();
  }
  loadAnime(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('anime_id');
      this.animeService.getAnime(id).subscribe(anime => {
        this.anime = anime;
        if (anime.description) {
          this.descriptions = anime.description.split('\n');
        }
        this.loadArticle();
        this.loadGenre();
        this.loadCharacters();
      });
    });
  }
  save(): void{
    this.managing = false;
    this.animeService.updateAnime(this.anime).subscribe(() => {
      this.loadData();
    });
  }
  loadArticle(): void{
    this.articleService.getArticles(this.anime.id).subscribe(articles => {
      this.articles = articles;
      console.log(articles.length);
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
  addCharacters(ids: number[]): void{
    let loading = 0;
    for (const id of ids){
      loading += 1;
      this.animeService.addCharacter(this.anime.id, id).subscribe(() => {
        loading -= 1;
        if (loading === 0){
          this.loadData();
        }
      });
    }
    this.addCharacter = false;
  }
  deleteCharacter(id: number): void{
    console.log(id);
    this.animeService.deleteCharacter(this.anime.id, id).subscribe(() => {
      this.loadData();
    });
  }
  addArticle(): void{
    this.articleService.addArticle(this.anime.id).subscribe(() => {
      this.loadData();
    });
  }
  updateArticle(article: Article): void{
    this.articleService.updateArticle(this.anime.id, article).subscribe(() => {
      this.loadData();
    });
  }
  deleteArticle(id: number): void{
    this.articleService.deleteArticle(this.anime.id, id).subscribe(() => {
      this.loadData();
    });
  }
  deleteGenre(id: number): void{
    this.animeService.deleteGenre(this.anime.id, id).subscribe(() => {
      this.loadData();
    });
  }

  addGenres(ids: number[]): void{
    this.addGenre = false;
    let loading = 0;
    for (const id of ids){
      loading += 1;
      this.animeService.addGenre(this.anime.id, id).subscribe(() => {
        loading -= 1;
        if (loading === 0){
          this.loadData();
        }
      });
    }
  }
}
