import { Component, Input, ViewChild } from '@angular/core';
import { PreviewComponent } from '../preview/preview.component';
import { Product } from '../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { CreateProduct } from '../../interface/create-product.interface';

@Component({
    selector: 'app-update-product',
    standalone: true,
    templateUrl: './update-product.component.html',
    styleUrl: './update-product.component.css',
    imports: [FormsModule,CommonModule, MessageDialogComponent]
})
export class UpdateProductComponent {

  constructor(
    private productService: ProductService
  ) { }
  createProduct: CreateProduct = {
    name: '',
    category: '',
    description: '',
    price: 0
  };
    @Input() product!: Product;

  categories: string[] = [
    'Eletrônicos', 'Computadores e Acessórios', 'Celulares e Acessórios', 'Câmeras e Fotografia', 'Gadgets e Dispositivos Inteligentes',
    'Móveis', 'Decoração', 'Eletrodomésticos', 'Jardinagem', 'Ferramentas',
    'Roupas Masculinas', 'Roupas Femininas', 'Roupas Infantis', 'Calçados', 'Acessórios de Moda',
    'Produtos de Cuidados Pessoais', 'Cosméticos', 'Maquiagem', 'Produtos de Cuidado com a Pele', 'Produtos de Cuidado Capilar', 'Produtos de Cuidado com as Unhas', 'Perfumes e Fragrâncias', 'Produtos para Barbear e Depilação', 'Produtos de Higiene',
    'Equipamentos Esportivos', 'Camping e Outdoor', 'Fitness e Musculação', 'Esportes Aquáticos',
    'Peças e Acessórios para Carros', 'Peças e Acessórios para Motos', 'Produtos de Manutenção Automotiva',
    'Brinquedos', 'Produtos de Bebê', 'Roupas Infantis', 'Jogos Educativos',
    'Alimentos para Animais', 'Acessórios para Pets', 'Produtos de Higiene para Pets',
    'Livros', 'Material Escolar', 'Escritório e Papelaria', 'Arte e Artesanato',
    'Produtos Alimentícios', 'Bebidas', 'Produtos Gourmet',
    'Instrumentos Musicais', 'Equipamentos de Áudio e DJ', 'Filmes e Séries', 'Jogos e Consoles',
    'Joias', 'Relógios', 'Acessórios de Luxo'
  ];

  onSubmit(form: NgForm) {
    if (form.valid) {
      MessageDialogComponent.showMessage('Atualizar produto', 'Isso irá atualizar os dados desse produto!',
        async () => {
          await this.productService.update(this.product.product_id, this.createProduct).subscribe({
            next: () => { console.log('product registered successfully') },
            error: (err) => { console.error(err) }
          });
        },
        () => {
          console.log('Cancelado pelo usuario!');
        }
      );
      console.log('Formulário enviado', this.createProduct);

    } else {
      MessageDialogComponent.showMessage('Erro ao cadastrar!');
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log('Arquivo selecionado:', fileList[0]);
      this.createProduct.image = fileList[0];  // Salvando o arquivo no objeto produto
    }
  }
}
