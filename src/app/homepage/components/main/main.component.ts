import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../../user/components/register/register.component";
import { LoginComponent } from "../../../user/components/login/login.component";
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [HeaderComponent, CommonModule, RegisterComponent, LoginComponent]
})
export class MainComponent {
    private static login:boolean = true;
    
    loginToRegister(){
        MainComponent.login = !MainComponent.login;
    }
    setLogin(login:boolean){
      MainComponent.login = login;
    }
    isLogin(){
        return MainComponent.login;
    }
}
