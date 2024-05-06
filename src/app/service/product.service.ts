import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product.interface';
import { UserService } from './user.service';
import { CreateProduct } from '../interface/create-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://product-catalog-api-woad.vercel.app/'// 'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    private userService:UserService
  ) { }

  delete(product_id: number | string) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}product/${product_id}`, { headers: headers });
  }
  save(product: CreateProduct) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Product>(`${this.apiUrl}product`, product, { headers })
  }
  update(product_id:number, product:CreateProduct){
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<Product>(`${this.apiUrl}product?id=${product_id}`, product, { headers })
  }
}
