import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Character} from '../models/character';
import {CharacterService} from '../services/character.service';

@Component({
  selector: 'app-add-characters',
  templateUrl: './add-characters.component.html',
  styleUrls: ['./add-characters.component.css']
})
export class AddCharactersComponent implements OnInit {
  characters: Character[] = [];
  checkedCharacters = {};
  @Output() addCharacters = new EventEmitter();
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  private loadCharacters(): void{
    this.characterService.getCharacters().subscribe(characters => {
      this.characters = characters;
      for (const character of characters){
        this.checkedCharacters[character.id] = false;
      }
    });
  }
  submit(): void{
    const ids = [];
    for (const character of this.characters){
      if (this.checkedCharacters[character.id]){
        ids.push(character.id);
      }
    }
    console.log(ids);
    this.addCharacters.emit(ids);
  }
}
