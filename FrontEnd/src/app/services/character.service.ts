import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Anime} from '../models/anime';
import {Character} from '../models/character';
import {Article} from '../models/article';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private BASE_URL = 'http://localhost:8000/api/characters';
  constructor(private client: HttpClient) {
  }
  getCharacters(): Observable<Character[]> {
    return this.client.get<Character[]>(`${this.BASE_URL}/`);
  }
  getCharacter(id: number): Observable<Character> {
    return this.client.get<Character>(`${this.BASE_URL}/${id}`);
  }
  addCharacter(): Observable<Character> {
    const character: Character = {
      id: 0,
      original_name: null,
      english_name: null,
      alias: null,
      race: null,
      gender: null,
      age: null,
      description: null,
      photo_url: null
    };
    return this.client.post<Character>(`${this.BASE_URL}/`, character);
  }
  updateCharacter(character: Character): Observable<Character> {
    return this.client.put<Character>(`${this.BASE_URL}/${character.id}`, character);
  }
  deleteCharacter(id: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/${id}`);
  }
  getAnimeList(id: number): Observable<Anime[]> {
    return this.client.get<Anime[]>(`${this.BASE_URL}/${id}/anime`);
  }
  addAnime(id: number, animeID: number): Observable<any> {
    return this.client.post(`${this.BASE_URL}/${id}/anime`, {anime: animeID});
  }
  deleteAnime(id: number, animeID: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/${id}/anime/${animeID}`);
  }
  getArticles(id: number): Observable<Article[]>{
    return this.client.get<Article[]>(`${this.BASE_URL}/${id}/articles`);
  }
  addArticle(id: number): Observable<Article>{
    const article: Article = {
      id: 0,
      name: 'New article',
      content: 'Type here'
    };
    return this.client.post<Article>(`${this.BASE_URL}/${id}/articles`, article);
  }
  updateArticle(id: number, article: Article): Observable<Article>{
    return this.client.put<Article>(`${this.BASE_URL}/${id}/articles`, article);
  }
  deleteArticle(id: number, articleID: number): Observable<any>{
    return this.client.delete(`${this.BASE_URL}/${id}/articles/${articleID}`);
  }
}
