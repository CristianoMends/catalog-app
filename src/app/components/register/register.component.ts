import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { User } from '../../interface/user.interface';
import { UserService } from '../../service/user.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private userService:UserService,
    private dialog:MessageDialogComponent
  ){}
  user: User = {
    fullName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  };
  confirmPassword:string = ''

    @ViewChild('registerForm') registerForm!: NgForm;

  onSubmit() {
    if (this.registerForm.valid) {
      const res = this.userService.save(this.user);
      res.subscribe({
        next:(res) => {
          MessageDialogComponent.showMessage('Usuário registrado com sucesso!',res.toString());
        },
        error:(err:HttpErrorResponse) =>{
          MessageDialogComponent.showMessage('Erro ao salvar usuário!',err.message)
        }
      })
      //window.location.href = 'catalog';

    } else {
      console.log('Form is not valid');
    }
  }
}
