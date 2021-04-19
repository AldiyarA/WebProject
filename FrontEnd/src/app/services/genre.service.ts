import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Anime} from '../models/anime';
import {Genre} from '../models/genre';
@Injectable({
  providedIn: 'root'
})
export class GenreService{
  private BASE_URL = 'http://localhost:8000/api/genres';
  constructor(private client: HttpClient) {
  }
  getGenres(): Observable<Genre[]> {
    return this.client.get<Genre[]>(`${this.BASE_URL}/`);
  }
  getGenre(id: number): Observable<Genre> {
    return this.client.get<Genre>(`${this.BASE_URL}/${id}`);
  }
  addGenre(): Observable<Genre>{
    const genre: Genre = {
      id: 0,
      name: null,
      description: null
    };
    return this.client.post<Genre>(`${this.BASE_URL}/`, genre);
  }
  updateGenre(genre: Genre): Observable<Genre> {
    return this.client.put<Genre>(`${this.BASE_URL}/${genre.id}`, genre);
  }
  deleteGenre(id: number): Observable<any> {
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
}
