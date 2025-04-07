import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { User } from '../../interface/user.interface';
import { UserService } from '../../service/user.service';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  imports: [CommonModule, FormsModule, MessageDialogComponent, HeaderComponent]
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
  hidePassword = true;
  hideConfirmPassword = true;

  @ViewChild('registerForm') registerForm!: NgForm;

  goBack() {
    window.location.href = '/';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      LoadingScreenComponent.setVisible()
      const res = this.userService.save(this.user);
      res.subscribe({
        next: (res) => {
          LoadingScreenComponent.setInvisible()
          MessageDialogComponent.showMessage('Usuário registrado com sucesso!', 'Você será redirecionado para a página de login.', undefined, undefined,
            () => { window.location.href = '/'; }
          );
        },
        error: (err: HttpErrorResponse) => {
          LoadingScreenComponent.setInvisible()
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


