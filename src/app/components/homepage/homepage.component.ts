import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from "../register-user/register-user.component";
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from "../footer/footer.component";
import { PreviewCatalogsComponent } from "../preview-catalogs/preview-catalogs.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [HeaderComponent, CommonModule, RegisterUserComponent, LoginComponent, FooterComponent, PreviewCatalogsComponent]
})
export class HomepageComponent {
    private static loginVisible:boolean = false;
    private static registerVisible:boolean = false;
    
    showLogin(){
        HomepageComponent.registerVisible = false;
        HomepageComponent.loginVisible = true;
    }
    showRegister(){
        HomepageComponent.loginVisible = false;
        HomepageComponent.registerVisible = true;
    }
    isLoginVisible(){
        return HomepageComponent.loginVisible;
    }
    isRegisterVisible(){
        return HomepageComponent.registerVisible;
    }
}
