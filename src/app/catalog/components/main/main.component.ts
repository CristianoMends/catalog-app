import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from "./product/product.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [HeaderComponent, ProductComponent]
})
export class MainComponent {

}
