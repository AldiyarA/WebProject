import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Anime} from '../models/anime';
import {animeList} from '../models/anime_s';
import {Article} from '../models/article';
import {articles} from '../models/articles';
@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {
  anime: Anime = undefined;
  articles: Article[];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadAnime();
    this.loadArticle();
  }
  loadAnime(): void{
    this.route.paramMap.subscribe((param) => {
      const id = +param.get('anime_id');
      console.log(id);
      this.anime = animeList.find(x => x.id === id);
      console.log(this.anime);
    });
  }
  loadArticle():void{
    this.articles=articles;
  }
}
