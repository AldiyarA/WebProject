import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthToken} from '../models/authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  constructor(private client: HttpClient) {
  }
  private BASE_URL = 'http://localhost:8000/api/login';
  login(username: string, password: string): Observable<AuthToken>{
    return this.client.post<AuthToken>(`${this.BASE_URL}/`, {
      username,
      password
    });
  }
}
