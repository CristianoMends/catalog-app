import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { User } from '../../interface/user.interface';
import { UserService } from '../../service/user.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  imports: [CommonModule, FormsModule, MessageDialogComponent]
})
export class RegisterUserComponent {
  constructor(
    private userService: UserService,
  ) { }
  user: User = {
    fullName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  };
  confirmPassword: string = 'meu ovo';
  hidePassword = true;
  hideConfirmPassword = true;

  @ViewChild('registerForm') registerForm!: NgForm;

  onSubmit() {
    if (this.registerForm.valid) {
      const res = this.userService.save(this.user);
      res.subscribe({
        next: (res) => {
          MessageDialogComponent.showMessage('Usuário registrado com sucesso!', 'Você será redirecionado para a página de login.', undefined, undefined,
            () => { window.location.href = '/'; }
          );
        },
        error: (err: HttpErrorResponse) => {
          MessageDialogComponent.showMessage('Erro ao salvar usuário!', `${err.error.message}`);
          console.error(err);
        }
      })

    } else {
      console.log('Form is not valid');
    }
  }

  toggleVisibility(field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirm') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
}
