import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  imports: [CommonModule, FormsModule, MessageDialogComponent]
})
export class FooterComponent {
  userEmail = '';
  userMessage = '';

  constructor(private http: HttpClient) { }

  sendEmail(form: NgForm) {
    if (form.valid) {
      form.ngSubmit
      form.reset();
    }
  }
}
