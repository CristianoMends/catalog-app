import { Component } from '@angular/core';
import { ProductComponent } from "../../components/product/product.component";
import { CommonModule } from '@angular/common';
import { Product } from '../../interface/product.interface';
import { CatalogService } from '../../service/catalog.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { PreviewComponent } from "../../components/preview/preview.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserView } from '../../interface/user-view.interface';
import { MessageDialogComponent } from "../../components/message-dialog/message-dialog.component";
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { Title } from '@angular/platform-browser';
import { log } from 'console';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  providers: [CatalogService],
  imports: [HeaderComponent, ProductComponent, CommonModule, FooterComponent, PreviewComponent, SearchBarComponent, MessageDialogComponent, LoadingScreenComponent]
})
export class CatalogComponent {
  products: Product[] = [];
  categories: string[] = [];
  productPreView!: Product;
  username!: string;
  user!: UserView;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private productService: CatalogService,
    private preview: PreviewComponent,
    private title: Title,
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username') || '';
    });

    LoadingScreenComponent.setVisible()
    this.productService.getProducts(this.username).subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.getUser(this.products[0]);

        this.products.forEach(p => {
          let c = p.category.toUpperCase();

          if (!this.categories.includes(c)) {
            this.categories.push(c);
          }
        })

        this.title.setTitle('Catálogo - ' + this.username.replaceAll('_', ' '));
        LoadingScreenComponent.setInvisible()
      },
      error: (err) => {
        console.error(err)
        LoadingScreenComponent.setInvisible()
      }
    }
    );
  }
  searchByName(searchTerm: string) {
    LoadingScreenComponent.setVisible()
    this.productService.getProductsByName(searchTerm, this.username).subscribe({
      next: (data: Product[]) => {
        console.log("Produtos recebidos por nome:", data);
        this.products = data;
        LoadingScreenComponent.setInvisible()
      },
      error: (err) => {
        LoadingScreenComponent.setInvisible()
        console.error(err)
      }
    });
  }
  searchByCategory(category: string) {
    LoadingScreenComponent.setVisible()
    this.productService.getProductsByCategory(category, this.username).subscribe({
      next: (data: Product[]) => {
        this.products = data;
        LoadingScreenComponent.setInvisible()
      },
      error: (err) => {
        console.error(err)
        LoadingScreenComponent.setInvisible()
      }
    });
  }
  isVisible(): string {
    return this.preview.isVisible() ? 'opacity' : '';
  }
  shareLink() {
    this.sendMessage('', `Olá! Confira o catálogo de produtos de ${this.user.fullName} nesse link: ${window.location.href}`);
  }

  sendMessage(phone: string, message: string): void {
    const cleanedPhone = phone.replace(/\D/g, ''); // Remove tudo que não for números
  
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const encodedMessage = encodeURIComponent(message);
  
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${cleanedPhone}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${cleanedPhone}&text=${encodedMessage}`;
  
    window.open(whatsappUrl, '_blank');
  }
  

  contactSeller(product: Product) {
    if (!this.user) {
      return;
    }
    if (!this.user.phone) {
      MessageDialogComponent.showMessage('Número de telefone não encontrado', 'O vendedor não possui número de telefone cadastrado.', undefined, undefined);
      return;
    }
    this.sendMessage('55' + this.user.phone, `Olá, gostaria de mais informações sobre o produto: \n${product.name}\nCódigo: ${product.product_id}`);
  }
  getUser(product: Product) {
    this.userService.getUserById(product.product_id).subscribe({
      next: (user: UserView) => { this.user = user },
      error: (err) => { console.error(err) }
    })
  }
}
