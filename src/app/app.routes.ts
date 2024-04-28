import { Routes } from '@angular/router';
import { MainComponent } from './catalog/components/main/main.component';
import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
import { ProfileComponent } from './user/components/profile/profile.component';

export const routes: Routes = [
    {
        path:'',
        component: MainComponent
    },{
        path:'login',
        component: LoginComponent
    },{
        path: 'register',
        component: RegisterComponent
    },{
        path: 'profile',
        component: ProfileComponent
    }
];
