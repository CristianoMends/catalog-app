import { Component, Injectable } from '@angular/core';
import { Product } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
  private static visible: boolean = false;
  private static product: Product | null = null;

  isVisible(): boolean {
    return PreviewComponent.visible;
  }

  setProduct(product: Product): void {
    PreviewComponent.product = product;
  }

  getProduct(): Product | null {
    return PreviewComponent.product;
  }

  toggleVisibility(): void {
    PreviewComponent.visible = !PreviewComponent.visible;
  }

  // Método que retorna a classe de visibilidade para a sobreposição
  showOrHide(): string {
    return this.isVisible() ? 'visible' : 'invisible';
  }
}
