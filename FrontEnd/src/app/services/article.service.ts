import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Anime} from '../models/anime';
import {Character} from '../models/character';
import {Article} from '../models/article';
@Injectable({
  providedIn: 'root'
})
abstract class ArticleService {
  private readonly BASE_URL: string;
  protected constructor(BASE_URL: string, private client: HttpClient) {
    this.BASE_URL = BASE_URL;
    this.client = client;
  }
  getArticles(id: number): Observable<Article[]>{
    return this.client.get<Article[]>(`${this.BASE_URL}/${id}/articles`);
  }
  addArticle(id: number): Observable<Article>{
    const article: Article = {
      id: 0,
      name: 'New article',
      content: 'Type here',
    };
    return this.client.post<Article>(`${this.BASE_URL}/${id}/articles/`, article);
  }
  updateArticle(id: number, article: Article): Observable<Article>{
    return this.client.put<Article>(`${this.BASE_URL}/${id}/articles/${article.id}`, article);
  }
  deleteArticle(id: number, articleID: number): Observable<any>{
    return this.client.delete(`${this.BASE_URL}/${id}/articles/${articleID}`);
  }
}
@Injectable({
  providedIn: 'root'
})
export class AnimeArticleService extends ArticleService{
  constructor(client: HttpClient) {
    super('http://localhost:8000/api/anime', client);
  }
}
@Injectable({
  providedIn: 'root'
})
export class CharacterArticleService extends ArticleService{
  constructor(client: HttpClient) {
    super('http://localhost:8000/api/characters', client);
  }
}
