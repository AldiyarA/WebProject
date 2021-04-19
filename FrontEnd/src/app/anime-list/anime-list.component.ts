import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Anime } from '../models/anime';
import { Genre } from '../models/genre';
import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: Anime[];
  genreIDs: number[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) { }

  ngOnInit(): void {
    this.loadGenres();
    this.loadAnime();
  }

  loadAnime(): void {
    this.animeService.getAnimeList().subscribe(animes => {
      this.animes = animes.filter(anime => {
        let animeGenres: Genre[] = [];
        this.animeService.getGenres(anime.id).subscribe(genres => {
          animeGenres = genres;
        });

        return animeGenres.some(genre => this.genreIDs.includes(genre.id));
      });
    });
  }

  loadGenres(): void{
    this.route.paramMap.subscribe((param) => {
      const idsString = param.get('ids');
      if (!idsString) { return; }

      this.genreIDs = idsString.split('-').map(i => +i);
    });
  }
}
