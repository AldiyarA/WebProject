import { Component, OnInit } from '@angular/core';
import {Character} from '../models/character';
import {CharacterService} from '../services/character.service';
import {Anime} from '../models/anime';
import {Article} from '../models/article';
import {templateJitUrl} from '@angular/compiler';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  characters: Character[] = [];
  character: Character = undefined;
  animeList: Anime[] = [];
  articles: Article[] = [];
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacter();
  }

  private loadCharacter(): void{
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
    this.characterService.getCharacter(1).subscribe(character => {
      this.character = character;
      this.characterService.getAnimeList(character.id).subscribe(animeList => {
        this.animeList = animeList;
      });
      this.characterService.getArticles(character.id).subscribe(articles => {
        this.articles = articles;
      });
    });
  }
  addAnime(): void{
    this.characterService.addAnime(this.character.id, 3).subscribe(() => {this.ngOnInit(); });
  }
  deleteAnime(id: number): void{
    this.characterService.deleteAnime(this.character.id, id).subscribe(() => {this.ngOnInit(); });
  }
}
