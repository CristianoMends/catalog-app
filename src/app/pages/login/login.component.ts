import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interface/auth.interface';
import { UserService } from '../../service/user.service';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [HeaderComponent, CommonModule, FormsModule, MessageDialogComponent]
})
export class LoginComponent {

  constructor(
    private userService: UserService
  ) {

    this.isLoggedIn();

  }
  type = 'password';
  isVisible = false;
  private auth: Auth = { email: '', password: '' };
  private token: string = '';

  toggleVisibility() {
    if (this.type === 'password') {
      this.type = 'text';
      this.isVisible = true;
    } else if (this.type === 'text') {
      this.type = 'password';
      this.isVisible = false;
    }
  }

  getAuth(): Auth {
    return this.auth;
  }

  goBack() {
    window.location.href = '/';
  }

  isLoggedIn() {
    this.userService.validateToken()
    const token = this.userService.getToken();
    if (token != null) {
      MessageDialogComponent.showMessage('Bem vindo de volta!', `Redirecionando para seu perfil`);
      setTimeout(function () {
        window.location.href = 'profile';
      }, 1500);
    };
  }

  onSubmit() {
    this.userService.getAuth(this.auth.email, this.auth.password).subscribe({
      next: () => this.isLoggedIn(),
      error: () => this.onFailedLogin()
    });
  }
  onFailedLogin() {
    MessageDialogComponent.showMessage('Usuário não encontrado', `Verifique seu email e senha e tente novamente, ou crie sua conta!`, () => { });
  }
}
