import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent {
  public static isLoading: boolean = false;

  getVisibility(){
    return LoadingScreenComponent.isLoading;
  }

  static setVisible(){
    LoadingScreenComponent.isLoading = true;
  }
  static setInvisible(){
    LoadingScreenComponent.isLoading = false;
  }
}
