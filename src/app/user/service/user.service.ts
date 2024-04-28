import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiAuth = 'https://product-catalog-api-woad.vercel.app/auth';
  constructor(private http: HttpClient) { }

  getAuth(email: string, password: string): Observable<string> {
    const body = { email: email, password: password };
    return this.http.post<string>(this.apiAuth, body);
  }
}
