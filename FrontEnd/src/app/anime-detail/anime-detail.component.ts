import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Anime} from '../models/anime'
import {anime} from "../models/anime_s"
@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {
  anime_detail!:Anime;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.anime_detail = anime.find(anime_detail => anime_detail.id === Number(this.route.snapshot.paramMap.get('anime_id')));
  }

}
