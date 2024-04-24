import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiGetAll = 'https://product-catalog-api-woad.vercel.app/catalog/cristiano_mendes';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiGetAll);
  }
  getProductsByName(searchTerm:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiGetAll}?name=${searchTerm}`);
  }
  getProductsByCategory(category:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiGetAll}?category=${category}`);
  }
}
