import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Anime} from '../models/anime';
import {Article} from '../models/article';
import {Character} from '../models/character';
import {CharacterService} from '../services/character.service';
@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  animes: Anime[];
  articles: Article[];
  character: Character = undefined;
  managing = false;
  addAnime = false;
  descriptions = [];
  aliases = [];
  logged = false;
  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    const token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
    this.loadCharacter();
  }
  loadCharacter(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('id');
      this.characterService.getCharacter(id).subscribe(character => {
        this.character = character;
        if (character.description){
          this.descriptions = character.description.split('\n');
        }
        if (character.alias){
          this.aliases = character.alias.split(',');
        }
        console.log(this.aliases);
        this.loadArticle();
        this.loadAnime();
      });
    });
  }
  loadArticle(): void{
    this.characterService.getArticles(this.character.id).subscribe(articles => {
      this.articles = articles;
    });
  }
  loadAnime(): void{
    this.characterService.getAnimeList(this.character.id).subscribe(animes => {
      this.animes = animes;
    });
  }
  updateArticle(article: Article): void{
    this.characterService.updateArticle(this.character.id, article);
  }
  deleteArticle(id: number): void{
    this.characterService.deleteArticle(this.character.id, id).subscribe(() => {
      this.ngOnInit();
    });
  }
  addArticle(): void{
    this.characterService.addArticle(this.character.id).subscribe(() => {
      this.ngOnInit();
    });
  }
  save(): void{
    this.managing = false;
    this.characterService.updateCharacter(this.character).subscribe(() => {
      this.ngOnInit();
    });
  }
  addAnimeList(ids: number[]): void{
    this.addAnime = false;
    let loading = 0;
    for (const id of ids){
      loading += 1;
      this.characterService.addAnime(this.character.id, id).subscribe(() => {
        loading -= 1;
        if (loading === 0){
          this.ngOnInit();
        }
      });
    }
  }

  deleteAnime(id: number): void{
    this.characterService.deleteAnime(this.character.id, id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
