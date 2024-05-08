import { Component } from '@angular/core';
import { CatalogService } from '../../service/catalog.service';
import { PreviewCatalog } from '../../interface/preview-catalog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-catalogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-catalogs.component.html',
  styleUrl: './preview-catalogs.component.css'
})
export class PreviewCatalogsComponent {
  catalogs!:PreviewCatalog[] 
    constructor(private catalogService:CatalogService){}

    ngOnInit(): void {
      this.getAllCatalogs();
    }

    getAllCatalogs(){
      this.catalogService.getAllCatalogs().subscribe({
        next:(res)=>{
          this.catalogs = res
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
}
