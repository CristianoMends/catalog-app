import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../interface/auth';
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
    const res = this.service.getAuth(this.auth.email, this.auth.password);
    console.log(res);
  }
}
