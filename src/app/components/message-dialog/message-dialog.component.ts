import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";

@Injectable({
  providedIn: 'root'
})

@Component({
    selector: 'app-message-dialog',
    standalone: true,
    templateUrl: './message-dialog.component.html',
    styleUrl: './message-dialog.component.css',
    imports: [CommonModule, LoaderComponent]
})
export class MessageDialogComponent {

  private static visible = false;
  private static title: string;
  private static message?: string;
  static onConfirm?: () => void;
  static onCancel?: () => void;
  private static options: number = 0;

  hide() {
    MessageDialogComponent.visible = false;
  }
  static showMessage(title: string, message?: string, onConfirm?: () => void, onCancel?: () => void) {

    MessageDialogComponent.title = title;
    MessageDialogComponent.message = message;
    MessageDialogComponent.onConfirm = onConfirm;
    MessageDialogComponent.onCancel = onCancel;

    MessageDialogComponent.visible = true;
  }
  hasLoad():boolean{
    return !this.getConfirm() && !this.getCancel();
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
  getOptions() {
    return MessageDialogComponent.options;
  }
  getCancel() {
    return MessageDialogComponent.onCancel;
  }
  getConfirm(){
    return MessageDialogComponent.onConfirm;
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
