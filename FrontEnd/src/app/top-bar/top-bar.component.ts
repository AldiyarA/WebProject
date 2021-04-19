import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AnimeService} from '../services/anime.service';
import {Anime} from '../models/anime';
import {CharacterService} from '../services/character.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(public router: Router,
              private animeService: AnimeService,
              private characterService: CharacterService) { }

  ngOnInit(): void {
  }

  createAnime(): void{
    this.animeService.addAnime().subscribe(anime => {
      this.router.navigate(['anime', anime.id]);
    });
  }

  createGenre(): void{
  }

  createCharacter(): void{
    this.characterService.addCharacter().subscribe(character => {
      this.router.navigate(['characters', character.id]);
    });
  }
}
