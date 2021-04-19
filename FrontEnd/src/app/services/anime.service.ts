import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Anime} from '../models/anime';
import {Character} from '../models/character';
import {Genre} from '../models/genre';
import {Article} from '../models/article';
@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private BASE_URL = 'http://localhost:8000/api/anime';

  constructor(private client: HttpClient) {
  }

  getAnimeList(): Observable<Anime[]> {
    return this.client.get<Anime[]>(`${this.BASE_URL}/`);
  }

  getAnimeFilterList(genres: number[]): Observable<Anime[]>{
    const genresStr = genres.join('-');
    return this.client.get<Anime[]>(`${this.BASE_URL}/filter/${genresStr}`);
  }

  getAnime(id: number): Observable<Anime> {
    return this.client.get<Anime>(`${this.BASE_URL}/${id}`);
  }

  addAnime(): Observable<Anime> {
    const anime: Anime = {
      id: 0,
      country: null,
      original_name: null,
      transcription: null,
      english_name: null,
      year: null,
      company: null,
      author: null,
      description: null,
      photo_url: null
    };
    return this.client.post<Anime>(`${this.BASE_URL}/`, anime);
  }

  updateAnime(anime: Anime): Observable<Anime> {
    return this.client.put<Anime>(`${this.BASE_URL}/${anime.id}`, anime);
  }

  deleteAnime(id: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/${id}`);
  }

  getCharacters(id: number): Observable<Character[]> {
    return this.client.get<Character[]>(`${this.BASE_URL}/${id}/characters`);
  }

  addCharacter(id: number, characterID: number): Observable<any> {
    return this.client.post(`${this.BASE_URL}/${id}/characters`, {character: characterID});
  }

  deleteCharacter(id: number, characterID: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/${id}/characters/${characterID}`);
  }
  getGenres(id: number): Observable<Genre[]> {
    return this.client.get<Genre[]>(`${this.BASE_URL}/${id}/genres`);
  }
  addGenre(id: number, genreID: number): Observable<any> {
    return this.client.post(`${this.BASE_URL}/${id}/genres`, {genre: genreID});
  }
  deleteGenre(id: number, genreID: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/${id}/genres/${genreID}`);
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
