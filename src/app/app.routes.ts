import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
    {
        path: '',
        component : HomepageComponent,
        title: 'Homepage'
    },{
        path:'catalog/:username',
        component: CatalogComponent,
        title: `Catalog - {{username}}`,
        data: { username: 'username' } 
    },{
        path:'login',
        component: LoginComponent
    },{
        path: 'register',
        component: RegisterUserComponent
    },{
        path: 'profile',
        component: ProfileComponent
    }
];
