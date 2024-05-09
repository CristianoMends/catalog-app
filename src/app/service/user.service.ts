import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Profile } from '../interface/profile.interface';
import { User } from '../interface/user.interface';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }


  getAuth(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ email, password });

    return this.http.post<any>(this.apiUrl + 'auth', body, { headers: headers }).pipe(
      tap(response => this.storeToken(response.access_token)),
      catchError(error => {
        console.error('Authentication error:', error);
        throw error;
      })
    );
  }

  getUserById(product_id: number) {
    return this.http.get<any>(`${this.apiUrl}catalog/user/${product_id}`)
  }

  getProfile(): Observable<Profile> {
    const token = this.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Profile>(this.apiUrl + 'user', { headers });
  }
  save(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'user', user)
  }


  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  validateToken(){
    const token = this.getToken();
    if(!token){
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get(`${this.apiUrl}auth`,{ headers }).subscribe({
      next:()=>{
        console.log('token is ok');
      },
      error:(err:HttpErrorResponse)=>{
        this.clearToken();
        console.error(err);
      }
    });
  }

  storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      console.log('localstorange is cleaned');
    }
  }

}
