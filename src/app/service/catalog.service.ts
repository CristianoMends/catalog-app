import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';
import { environment } from '../../environments/environment';
import { PreviewCatalog } from '../interface/preview-catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = environment.API_URL; //'https://product-catalog-api-woad.vercel.app/'//'http://localhost:3000/catalog/'; //'https://product-catalog-api-woad.vercel.app/catalog/cristiano_mendes';
  constructor(private http: HttpClient) { }

  getProducts(username:string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}catalog/${username}`);
  }
  getProductsByName(searchTerm:string, username:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}catalog/${username}?name=${searchTerm}`);
  }
  getProductsByCategory(category:string, username:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}catalog/${username}?category=${category}`);
  }
  getAllCatalogs(): Observable<PreviewCatalog[]> {
    return this.http.get<PreviewCatalog[]>(`${this.apiUrl}catalog`);
  }
}
