import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Anime} from '../models/anime';
import {animeList} from '../models/anime_s';
import {Article} from '../models/article';
import {articles} from '../models/articles';
import {Genre} from '../models/genre';
import {genres} from '../models/genres';
import {Character} from '../models/character';
import {characters} from '../models/characters';
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  animes:Anime[];
  articles: Article[];
  character: Character = undefined;
  managing=false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadCharacter();
  }
  loadCharacter(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('id');
      console.log(id);
      this.character = characters.find(x => x.id === id);
      this.loadArticle();
      this.loadAnime();
    });
  }
  loadArticle(): void{
    this.articles = articles;
  }
  loadAnime(): void{
    this.animes = animeList;
  }
  updateArticle(article: Article): void{
  }
  save():void{
    this.managing=false;
  }
}
