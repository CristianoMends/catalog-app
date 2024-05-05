import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interface/auth.interface';
import { UserService } from '../../service/user.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { User } from '../../interface/user.interface';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, FormsModule, MessageDialogComponent]
})
export class LoginComponent {

  constructor(
    private userService: UserService
  ) {
    
    this.isLoggedIn();

  }

  private auth: Auth = { email: '', password: '' };
  private token: string = '';

  getAuth(): Auth {
    return this.auth;
  }

  isLoggedIn(){
    const token = this.userService.getToken();
    if (token != null) { 
      MessageDialogComponent.showMessage('Bem vindo de volta!',`Redirecionando para seu perfil`);
      setTimeout(function(){
        window.location.href = 'profile';
      },1500);
     };
  }

  onSubmit() {
    this.userService.getAuth(this.auth.email, this.auth.password).subscribe({
      next: () => this.onSuccessLogin(),
      error: () => this.onFailedLogin()
    });
  }
  onSuccessLogin() {
    alert('Login bem succedido, redirecionando...')
    window.location.href = 'profile';
  }
  onFailedLogin() {
    alert('Usuario não encontrado');
  }
}
