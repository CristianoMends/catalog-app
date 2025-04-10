import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interface/product.interface';
import { PreviewComponent } from '../preview/preview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  providers: [PreviewComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(  private readonly previewComponent: PreviewComponent,
  ){

  }
  @Input() product!: Product;

  showPreview() {
    this.previewComponent.setProduct(this.product)
    this.previewComponent.toggleVisibility()
  }


  ngOnInit(): void {

  }
}
