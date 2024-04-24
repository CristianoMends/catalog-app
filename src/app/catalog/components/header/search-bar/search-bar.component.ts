import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../../service/catalog.service';
import { MainComponent } from '../../main/main.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  constructor(private readonly mainComponente:MainComponent){

  }
  searchTerm!:string
  onSubmit(): void {
    this.mainComponente.searchByName(this.searchTerm);
  }

}
