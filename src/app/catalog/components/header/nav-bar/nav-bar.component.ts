import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css',
    imports: [SearchBarComponent, CommonModule]
})
export class NavBarComponent {
    visible = false;
    toggleVisible() {
        this.visible = !this.visible
    }

}
