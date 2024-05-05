import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product.interface';

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
  save(product: Product, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.post<Product>(`${this.apiUrl}product`, product, { headers })
  }
}
