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
  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacter();
  }
  loadCharacter(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('id');
      this.characterService.getCharacter(id).subscribe(character => {
        this.character = character;
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
}
