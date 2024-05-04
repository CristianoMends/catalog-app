import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [HeaderComponent, CommonModule, RegisterComponent, LoginComponent]
})
export class HomepageComponent {
    private static login:boolean = true;
    
    loginToRegister(){
        HomepageComponent.login = !HomepageComponent.login;
    }
    setLogin(login:boolean){
      HomepageComponent.login = login;
    }
    isLogin(){
        return HomepageComponent.login;
    }
}
