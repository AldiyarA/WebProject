import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AnimeService} from '../services/anime.service';
import {Anime} from '../models/anime';
import {CharacterService} from '../services/character.service';
import {GenreService} from '../services/genre.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  logged = false;
  constructor(public router: Router,
              private animeService: AnimeService,
              private characterService: CharacterService,
              private genreService: GenreService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token){
      this.logged = true;
    }else {
      this.logged = false;
    }
  }

  createAnime(): void{
    this.animeService.addAnime().subscribe(anime => {
      this.router.navigate(['anime', anime.id]);
    });
  }

  createGenre(): void{
    this.genreService.addGenre().subscribe(genre => {
      this.router.navigate(['genres', genre.id]);
    });
  }

  createCharacter(): void{
    this.characterService.addCharacter().subscribe(character => {
      this.router.navigate(['characters', character.id]);
    });
  }

  logout(): void{
    localStorage.removeItem('token');
    this.ngOnInit();
  }

  login(): void{
    this.router.navigate(['login']);
  }
}
