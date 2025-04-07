import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterContentInit {
  showDefaultButtons: boolean = true;
  @ContentChildren('customNavItem', { descendants: true, read: ElementRef })
  customNavItems!: QueryList<ElementRef>;

  constructor(private router: Router) { }
  ngAfterContentInit() {
    // Se tiver qualquer conteúdo inserido, esconde os botões
    this.showDefaultButtons = this.customNavItems.length === 0;
  }
  login() {
    window.location.href = 'login';
  }

  signup() {
    this.router.navigate(['/register']);
  }

  goTo(url: string) {
    window.location.href = url;
  }
}
