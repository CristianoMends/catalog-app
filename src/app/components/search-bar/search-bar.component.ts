import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainComponent } from '../catalog/main.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm!:string

  constructor(private readonly mainComponente:MainComponent){}

  onSubmit(): void {
    this.mainComponente.searchByName(this.searchTerm);
  }

}
