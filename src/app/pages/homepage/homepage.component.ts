import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from "../register-user/register-user.component";
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { PreviewCatalogsComponent } from "../../components/preview-catalogs/preview-catalogs.component";
import { FeaturesComponent } from '../../components/features/features.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [CtaComponent,FeaturesComponent,HeroComponent,HeaderComponent, CommonModule, RegisterUserComponent, LoginComponent, FooterComponent, PreviewCatalogsComponent]
})
export class HomepageComponent {
}
