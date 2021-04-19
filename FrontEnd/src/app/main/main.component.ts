import { Component, OnInit } from '@angular/core';
import {GenreService} from '../services/genre.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
  }
}
