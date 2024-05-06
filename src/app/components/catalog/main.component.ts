import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { Product } from '../../interface/product.interface';
import { CatalogService } from '../../service/catalog.service';
import { FooterComponent } from '../footer/footer.component';
import { PreviewComponent } from "../preview/preview.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  providers: [CatalogService],
  imports: [HeaderComponent, ProductComponent, CommonModule, FooterComponent, PreviewComponent, SearchBarComponent]
})
export class MainComponent {
  products: Product[] = [];
  categories: string[] = [];
  productPreView!: Product;
  username!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: CatalogService,
    private preview: PreviewComponent
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });

    this.productService.getProducts(this.username).subscribe({

      next: (data: Product[]) => {
        this.products = data;
        this.products.forEach(p => {
          let c = p.category.toUpperCase();

          if (!this.categories.includes(c)) {
            this.categories.push(c);
          }
        })
      },
      error: (err) => console.error(err)
    });
  }
  searchByName(searchTerm: string) {

    this.productService.getProductsByName(searchTerm, this.username).subscribe({
      next: (data: Product[]) => {
        console.log("Produtos recebidos por nome:", data);
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }
  searchByCategory(category: string) {

    this.productService.getProductsByCategory(category, this.username).subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }
  isVisible(): string {
    return this.preview.isVisible() ? 'opacity' : '';
  }
  exportImage() {
    const element = document.getElementById('catalog');
    if(element)
    html2canvas(element).then(canvas => {
      const image = canvas.toDataURL('image/png');
      this.shareOnWhatsApp();
    });
  }
  
  shareOnWhatsApp() {
    const phoneNumber = '88999900549';
    const message = 'teste';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    //window.open(whatsappUrl, '_blank');
    window.location.href = whatsappUrl
  }
}
