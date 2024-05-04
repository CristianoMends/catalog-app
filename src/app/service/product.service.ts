import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/';
  constructor(
    private http: HttpClient,
  ) { }

  delete(product_id: number | string, token: string | null) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}product/${product_id}`, { headers: headers });
  }
}
