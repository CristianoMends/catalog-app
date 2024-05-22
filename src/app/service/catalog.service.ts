import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';
import { environment } from '../../environments/environment.prod';
import { PreviewCatalog } from '../interface/preview-catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.API_URL;

  getProducts(username: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}catalog/${username}`);
  }
  getProductsByName(searchTerm: string, username: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}catalog/${username}?name=${searchTerm}`);
  }
  getProductsByCategory(category: string, username: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}catalog/${username}?category=${category}`);
  }
  getAllCatalogs(): Observable<PreviewCatalog[]> {
    return this.http.get<PreviewCatalog[]>(`${this.apiUrl}catalog`);
  }
}
