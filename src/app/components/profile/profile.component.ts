import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { Profile } from '../../interface/profile.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../interface/product.interface';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from "../preview/preview.component";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";
import { ProductService } from '../../service/product.service';
import { UserService } from '../../service/user.service';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [HeaderComponent, SearchBarComponent, CommonModule, ProductComponent, FormsModule, PreviewComponent, MessageDialogComponent]
})
export class ProfileComponent {
    selectedProductId: number | null = null;
    selectedProduct!: Product;
    profile!: Profile

    constructor(
        private userService: UserService,
        private productService: ProductService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            const res = this.userService.getProfile();
            res.subscribe({
                next: (p: Profile) => { this.profile = p; },
                error: (err: HttpErrorResponse) => {
                    MessageDialogComponent.showMessage('Não autorizado', 'Para acessar seus dados, realize o login!',
                        () => { window.location.href = '/' }
                    );

                    console.error(`Error: ${err.message}\nName: ${err.name}\nHeaders: ${err.headers}\nStatus: ${err.status}\nStatusText: ${err.statusText}\nType: ${err.type}`)
                }
            });
        }
    }
    logout(){
        MessageDialogComponent.showMessage('Deseja fazer logout?',undefined,
        () =>{
            this.userService.clearToken();
            window.location.href = '/';
        },
        () => {
            return;
        });
    }
    onProductSelected(): void {

        if (this.selectedProductId && this.profile) {

            const p = this.profile.products.forEach(p => {
                if (p.product_id == this.selectedProductId) {
                    this.selectedProduct = p
                }
            });
        }
    }
    deleteProduct(product_id: number) {
        const token = this.userService.getToken();
        MessageDialogComponent.showMessage('Aviso', 'Isso irá deletar esse item permanentemente',
            () => console.log('canceled'),//onCancel
            () => this.productService.delete(product_id, token).subscribe({
                next: (res) => { console.log(res) },
                error: (err: HttpErrorResponse) => {
                    MessageDialogComponent.showMessage('Erro ao deletar', '');

                    console.error(`Error: ${err.message}\nName: ${err.name}\nHeaders: ${err.headers}\nStatus: ${err.status}\nStatusText: ${err.statusText}\nType: ${err.type}`)
                }
            }));//onConfirm

        //
    }


}
