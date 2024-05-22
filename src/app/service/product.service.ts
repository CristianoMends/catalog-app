import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product.interface';
import { UserService } from './user.service';
import { CreateProduct } from '../interface/create-product.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  private apiUrl = environment.API_URL;

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

    const formData: FormData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('installment', product.installment!.toString());
    formData.append('price', product.price!.toString());

    if (product.file) {
      formData.append('file', product.file, product.file.name);
    }

    return this.http.post<Product>(`${this.apiUrl}product`, formData, { headers })
  }
  update(product_id: number, product: CreateProduct) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData: FormData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price!.toString());

    if (product.file) {
      formData.append('file', product.file, product.file.name);
    }

    return this.http.put<Product>(`${this.apiUrl}product/id=${product_id}`, formData, { headers })
  }
}
