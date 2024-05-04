import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent {

  private static visible = false;
  private static title: string;
  private static message: string;
  static onConfirm?: () => void;
  static onCancel?: () => void;
  private static optionSelected?:number;

  hide() {
    MessageDialogComponent.visible = false;
  }
  showMessage(title: string, message: string, onCancel?: () => void, onConfirm?: () => void) {
    MessageDialogComponent.title = title;
    MessageDialogComponent.message = message;

    MessageDialogComponent.onConfirm = onConfirm;
    MessageDialogComponent.onCancel = onCancel;

    MessageDialogComponent.visible = true;
  }
  isVisible(): boolean {
    return MessageDialogComponent.visible;
  }
  getTitle() {
    return MessageDialogComponent.title;
  }
  getMessage() {
    return MessageDialogComponent.message;
  }
  runConfirm() {
    if (MessageDialogComponent.onConfirm) {
      MessageDialogComponent.onConfirm();
    }
    this.hide();
  }

  runCancel() {
    if (MessageDialogComponent.onCancel) {
      MessageDialogComponent.onCancel();
    }
    this.hide();
  }

}
