import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../interface/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  constructor() {}
  ngOnInit(): void {
    
  }
}
