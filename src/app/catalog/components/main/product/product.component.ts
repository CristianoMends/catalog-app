import { Component } from '@angular/core';

interface Product {
  image: string;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product;

  constructor() {
    this.product = {
      image: '/assets/user_icon.png',
      name: 'Product Name',
      description: 'Product Description',
      price: 99.99
    };
}
    
}
