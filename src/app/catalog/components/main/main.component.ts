import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from "./product/product.component";
import { CommonModule } from '@angular/common';
import { Product } from '../../interface/product.interface';
import { CatalogService } from '../../service/catalog.service';
import { FooterComponent } from '../footer/footer.component';
import { ResourceLoader } from '@angular/compiler';
import { PreviewComponent } from "./preview/preview.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    providers: [CatalogService],
    imports: [HeaderComponent, ProductComponent, CommonModule, FooterComponent, PreviewComponent]
})
export class MainComponent {
  products: Product[] = [];
  categories: string[] = [];
  productPreView!:Product;

  constructor(
    private productService: CatalogService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.products.forEach(p =>{
          if(!this.categories.includes(p.category)){
            this.categories.push(p.category.toLocaleUpperCase());
          }
        })
      },
      error: (err) => console.error(err)
    });
  }
  searchByName(searchTerm: string) {
    console.log("Chamando searchByName com:", searchTerm);
    this.productService.getProductsByName(searchTerm).subscribe({
      next: (data: Product[]) => {
        console.log("Produtos recebidos por nome:", data);  // Adicione este log
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }
  searchByCategory(category: string) {
    console.log("Chamando searchByName com:", category);
    this.productService.getProductsByCategory(category).subscribe({
      next: (data: Product[]) => {
        console.log("Produtos recebidos por categoria:", data);  // Adicione este log
        this.products = data;
      },
      error: (err) => console.error(err)
    });
  }
}
