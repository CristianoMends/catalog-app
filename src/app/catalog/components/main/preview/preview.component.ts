import { Component, Injectable, Input } from '@angular/core';
import { Product } from '../../../interface/product.interface';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  private static visible: boolean = false;
  private static product: Product | null = null;

  isVisible() {
    return PreviewComponent.visible;
  }
  setProduct(product:Product){
    PreviewComponent.product = product;
  }
  getProduct():Product | null{
    return PreviewComponent.product;
  }
  toggleVisibility() {
    PreviewComponent.visible = !PreviewComponent.visible
    console.log('visible: ' + PreviewComponent.visible)
  }
   showOrHide():string {

    return this.isVisible() ? 'visible' : 'invisible';
  }
}
