import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user.interface';
import { Product } from '../../interface/product.interface';
import { CreateProduct } from '../../interface/create-product.interface';
import { ProductService } from '../../service/product.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';

@Component({
    selector: 'app-register-product',
    standalone: true,
    templateUrl: './register-product.component.html',
    styleUrl: './register-product.component.css',
    imports: [CommonModule, FormsModule, MessageDialogComponent, LoadingScreenComponent]
})
export class RegisterProductComponent {

  constructor(
    private productService: ProductService
  ) { }

   @Input() product: CreateProduct = {
    name: '',
    category: '',
    description: '',
    price: undefined,
    installment : undefined,
    file: undefined
  };

  categories: string[] = [
    'Eletrônicos', 'Computadores e Acessórios', 'Celulares e Acessórios', 'Câmeras e Fotografia', 'Gadgets e Dispositivos Inteligentes',
    'Móveis', 'Decoração', 'Eletrodomésticos', 'Jardinagem', 'Ferramentas',
    'Roupas Masculinas', 'Roupas Femininas', 'Roupas Infantis', 'Calçados', 'Acessórios de Moda',
    'Produtos de Cuidados Pessoais', 'Cosméticos', 'Maquiagem', 'Produtos de Cuidado com a Pele', 'Produtos de Cuidado Capilar', 'Produtos de Cuidado com as Unhas', 'Perfumes e Fragrâncias', 'Produtos para Barbear e Depilação', 'Produtos de Higiene',
    'Equipamentos Esportivos', 'Camping e Outdoor', 'Fitness e Musculação', 'Esportes Aquáticos',
    'Peças e Acessórios automotivos' , 'Produtos de Manutenção Automotiva',
    'Brinquedos', 'Produtos de Bebê', 'Roupas Infantis', 'Jogos Educativos',
    'Alimentos para Animais', 'Acessórios para Pets', 'Higiene para Pets',
    'Livros', 'Material Escolar', 'Escritório e Papelaria', 'Arte e Artesanato',
    'Produtos Alimentícios', 'Bebidas', 'Produtos Gourmet',
    'Instrumentos Musicais', 'Equipamentos de Áudio e DJ', 'Filmes e Séries', 'Jogos e Consoles',
    'Joias', 'Relógios', 'Acessórios de Luxo', 'Canecas', 'Diversos'
  ];
  ngOnInit(): void {
    this.categories.sort();
    
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
        this.product.price = +this.product.price!.toFixed(2);      
      MessageDialogComponent.showMessage('Deseja salvar esse produto?', undefined,
        async () => {
          LoadingScreenComponent.setVisible()
          await this.productService.save(this.product).subscribe({
            next: () => {
              LoadingScreenComponent.setInvisible();
              MessageDialogComponent.showMessage('Produto salvo com sucesso!',undefined,()=>{}) 
              form.reset()
            },              
            error: (err) => {
              LoadingScreenComponent.setInvisible();
              MessageDialogComponent.showMessage('Erro ao cadastrar!',undefined,()=>{});
              console.error(err) }
          });
        },
        () => {
          console.log('Cancelado pelo usuario!');
        }
      );
      console.log('Formulário enviado', this.product);

    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.product.file = fileList[0];
      console.log('Arquivo selecionado:', this.product.file);
    }
  }

  
}
