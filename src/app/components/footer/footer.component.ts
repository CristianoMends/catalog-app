import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  @Input() message:string = '';

  sendEmail(message: string): void {
    const subject = encodeURIComponent('Interesse no Portfólio');
    const emailBody = encodeURIComponent(message)
    window.open(`mailto:mendescristiano012@gmail.com?subject=${subject}&body=${emailBody}`, '_blank')
  }


}
