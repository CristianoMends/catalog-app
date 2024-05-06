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
  static onLoad?: () => void;
  private static options: number = 0;

  static showMessage(title: string, message?: string, onConfirm?: () => void, onCancel?: () => void, onLoad?: () => void) {

    MessageDialogComponent.title = title;
    MessageDialogComponent.message = message;
    MessageDialogComponent.onConfirm = onConfirm;
    MessageDialogComponent.onCancel = onCancel;
    MessageDialogComponent.onLoad = onLoad;

    MessageDialogComponent.visible = true;
    if (!onConfirm && !onCancel) {
      setTimeout(() => {
        MessageDialogComponent.runOnLoad();
        MessageDialogComponent.visible = false;
      }, 1500);
    }
  }

  hide() {
    MessageDialogComponent.visible = false;
  }
  hasLoad(): boolean {
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
  getConfirm() {
    return MessageDialogComponent.onConfirm;
  }
  runConfirm() {
    if (MessageDialogComponent.onConfirm) {
      MessageDialogComponent.onConfirm();
    }
    this.hide();
  }
  static runOnLoad() {
    if (MessageDialogComponent.onLoad) {
      MessageDialogComponent.onLoad();
    }
  }

  runCancel() {
    if (MessageDialogComponent.onCancel) {
      MessageDialogComponent.onCancel();
    }
    this.hide();
  }

}
