import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Profile } from '../interface/profile.interface';
import { User } from '../interface/user.interface';
import { MessageDialogComponent } from '../components/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/';

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

  storeToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setExpireTime();
      localStorage.setItem('access_token', token);
    }
  }

  clearToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  }
  async setExpireTime() {
    setTimeout(() => {
      MessageDialogComponent.showMessage('acesso expirado');
      this.clearToken();
      window.location.href = '/';    
    }, 6000);

  }
}
