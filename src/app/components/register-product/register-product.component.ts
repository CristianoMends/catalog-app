import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user.interface';
import { Product } from '../../interface/product.interface';
import { CreateProduct } from '../../interface/create-product.interface';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-register-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageDialogComponent],
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.css'
})
export class RegisterProductComponent {

  constructor(
    private productService: ProductService
  ) { }
  product: CreateProduct = {
    name: '',
    category: '',
    description: '',
    price: 0
  };

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
      MessageDialogComponent.showMessage('Deseja cadastrar esse item?', undefined,
        async () => {
          await this.productService.save(this.product).subscribe({
            next: () => { console.log('product registered successfully') },
            error: (err) => { console.error(err) }
          });
        },
        () => {
          console.log('Cancelado pelo usuario!');
        }
      );
      console.log('Formulário enviado', this.product);

    } else {
      MessageDialogComponent.showMessage('Erro ao cadastrar!');
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log('Arquivo selecionado:', fileList[0]);
      this.product.image = fileList[0];  // Salvando o arquivo no objeto produto
    }
  }
}
