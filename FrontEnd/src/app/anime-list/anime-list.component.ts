import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Anime } from '../models/anime';
import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  animes: Anime[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) {
    this.animes = [];
  }

  ngOnInit(): void {
    this.loadAnime();
  }

  loadAnime(): void{
    this.route.paramMap.subscribe((param) => {
      const idsString = param.get('ids');
      if (!idsString) {
        this.animeService.getAnimeList().subscribe(animes => {
          this.animes = animes;
        });
        return;
      }

      const genreIDs = idsString.split('-').map(i => +i);
      this.animeService.getAnimeFilterList(genreIDs).subscribe(animes => {
        this.animes = animes;
      });
    });
  }

  goToFilter(): void {
    this.route.paramMap.subscribe((param) => {
      const idsString = param.get('ids');
      this.router.navigate(['/filter', idsString]);
    });
  }
}
