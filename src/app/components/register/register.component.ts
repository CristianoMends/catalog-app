import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  };
  confirmPassword:string = ''

    @ViewChild('registerForm') registerForm!: NgForm;

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration Data:', this.user);
      alert('Cadastro bem sucedido!');
      window.location.href = 'catalog';

    } else {
      console.log('Form is not valid');
    }
  }
}
