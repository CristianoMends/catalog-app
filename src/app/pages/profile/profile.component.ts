import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { Profile } from '../../interface/profile.interface';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductComponent } from "../../components/product/product.component";
import { Product } from '../../interface/product.interface';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from "../../components/preview/preview.component";
import { MessageDialogComponent } from "../../components/message-dialog/message-dialog.component";
import { ProductService } from '../../service/product.service';
import { UserService } from '../../service/user.service';
import { RegisterProductComponent } from "../../components/register-product/register-product.component";
import { UpdateProductComponent } from "../../components/update-product/update-product.component";
import { LoadingScreenComponent } from "../../components/loading-screen/loading-screen.component";
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [HeaderComponent, CommonModule, ProductComponent, FormsModule, PreviewComponent, MessageDialogComponent, RegisterProductComponent, UpdateProductComponent, LoadingScreenComponent]
})
export class ProfileComponent {
    selectedProductId: number | null = null;
    selectedProduct!: Product;
    profile!: Profile
    private static chosenManagement: number = 0;

    constructor(
        private userService: UserService,
        private productService: ProductService,
        private title: Title,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {

    }
    formatPhone(phone: string): string {
        if (!phone) return phone;
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3, 7)} - ${phone.slice(7)}`;
    }
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.userService.getToken()) {
                MessageDialogComponent.showMessage('Acesso não autorizado', 'Você será redirecionado para a página de login.', undefined, undefined,
                    () => { window.location.href = '/'; }
                );
                return;
            }

            this.loadUserProfile();
        }
    }
    loadUserProfile() {
        LoadingScreenComponent.setVisible()
        const res = this.userService.getProfile();
        res.subscribe({
            next: (p: Profile) => {
                LoadingScreenComponent.setInvisible()
                this.profile = p;
                this.title.setTitle(`Perfil de ${this.profile.fullName.replaceAll('_', ' ')}`);
            },
            error: (err: HttpErrorResponse) => {
                LoadingScreenComponent.setInvisible()
                MessageDialogComponent.showMessage('Acesso não autorizado', 'Você será redirecionado para a página de login!',
                    () => { window.location.href = '/' }
                );
                console.error(`Error: ${err.message}\nName: ${err.name}\nHeaders: ${err.headers}\nStatus: ${err.status}\nStatusText: ${err.statusText}\nType: ${err.type}`)
            }
        });
    }
    hiddenRegisterProduct() {
        this.chooseManagement(0);
    }

    calculateAveragePrice(): number {
        const total = this.profile.products.reduce((sum, product) => sum + product.price, 0);
        return total / this.profile.products.length;
    }

    calculateTotalInstallments(): number {
        return this.profile.products.reduce((sum, product) => sum + product.installment, 0);
    }

    getCategoryStats() {
        const categories = new Map();
        this.profile.products.forEach(product => {
            categories.set(product.category, (categories.get(product.category) || 0) + 1);
        });
        return Array.from(categories, ([name, count]) => ({ name, count }));
    }

    copyCatalogLink() {
        const link = `${window.location.origin}/catalog/${this.profile.fullName.toLocaleLowerCase().replaceAll(' ', '_')}`;
        navigator.clipboard.writeText(link).then(() => {
            console.log('Link copiado:', link);
            // Se quiser, exiba um alerta ou mensagem temporária:
            alert('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar link:', err);
        });
    }



    logout() {
        if (isPlatformBrowser(this.platformId)) {
            MessageDialogComponent.showMessage('Sair', 'Tem certeza que deseja sair?',
                () => {
                    this.userService.clearToken();
                    window.location.href = '/';
                },
                () => { return; }
            );
        }
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
    //-----------------------------------------------------------------------------
    deleteProduct(product_id: number) {
        const token = this.userService.getToken();
        MessageDialogComponent.showMessage('Aviso', 'Isso irá deletar esse produto permanentemente!\n',
            () => {//onConfirm
                LoadingScreenComponent.setVisible()

                this.productService.delete(product_id).subscribe({
                    next: (res) => {
                        LoadingScreenComponent.setInvisible()
                        MessageDialogComponent.showMessage('Produto deletado!', undefined, () => {
                            window.location.href = 'profile';
                        })
                    },
                    error: (err: HttpErrorResponse) => {
                        LoadingScreenComponent.setInvisible()
                        MessageDialogComponent.showMessage('Erro ao deletar', '');

                        console.error(`Error: ${err.message}\nName: ${err.name}\nHeaders: ${err.headers}\nStatus: ${err.status}\nStatusText: ${err.statusText}\nType: ${err.type}`)
                    }
                })
            },
            () => {//onCancel
                console.log('delete, canceled');
            });
    }

    //----------------------------------------------------------------------------
    updateProduct() {
        const token = this.userService.getToken();

    }
    chooseManagement(op: number) {
        ProfileComponent.chosenManagement = op;
    }
    getChoosenManagement() {
        return ProfileComponent.chosenManagement;
    }


}
