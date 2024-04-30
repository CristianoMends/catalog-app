import { Component } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HeaderComponent as a } from '../../../homepage/components/header/header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [a ,SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
