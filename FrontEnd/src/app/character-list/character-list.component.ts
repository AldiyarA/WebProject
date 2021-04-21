import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character'
import { CharacterService } from '../services/character.service'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters: Character[];
  constructor(private characterService: CharacterService) {
    this.characters = [];
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }

}
