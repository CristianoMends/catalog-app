import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interface/auth.interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private readonly service: UserService) { }

  private auth: Auth = { email: '', password: '' };
  private token: string = '';

  getAuth(): Auth {
    return this.auth;
  }

  onSubmit() {
    this.service.getAuth(this.auth.email, this.auth.password).subscribe({
      next: (response) => this.onSuccessLogin(),
      error: (error) => this.onFailedLogin()
    });
  }
  onSuccessLogin(){
    alert('Login bem succedido, redirecionando...')
    window.location.href = 'profile';
  }
  onFailedLogin(){
    alert('Usuario não encontrado');
  }
}
