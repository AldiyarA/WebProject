import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AnimeService} from '../services/anime.service';
import {Anime} from '../models/anime';

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.css']
})
export class AddAnimeComponent implements OnInit {
  animeList: Anime[] = [];
  checkedAnime = {};
  @Output() addAnime = new EventEmitter();

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.loadAnime();
  }
  loadAnime(): void{
    this.animeService.getAnimeList().subscribe(animeList => {
      this.animeList = animeList;
      for (const anime of animeList){
        this.checkedAnime[anime.id] = false;
      }
    });
  }
  submit(): void{
    const ids = [];
    for (const anime of this.animeList){
      if (this.checkedAnime[anime.id]){
        ids.push(anime.id);
      }
    }
    console.log(ids);
    this.addAnime.emit(ids);
  }
}
