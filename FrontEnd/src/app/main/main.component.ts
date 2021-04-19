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
  }
}
