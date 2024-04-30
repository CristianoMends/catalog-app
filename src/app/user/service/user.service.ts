import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiAuth = 'https://product-catalog-api-woad.vercel.app/auth';
  constructor(private http: HttpClient) { }

  getAuth(email: string, password: string){
    this.http.post(this.apiAuth, { email, password })
              .subscribe(
                resultado => {
                  console.log(resultado)
                },
                erro => {
                  if(erro.status == 400) {
                    console.log(erro);
                  }
                }
              );
  }

  private storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public clearToken(): void {
    localStorage.removeItem('access_token');
  }

  
}
