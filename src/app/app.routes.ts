import { Routes } from '@angular/router';
import { MainComponent } from './components/catalog/main.component';
import { HomepageComponent as MainComponentHome } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {
        path: '',
        component : MainComponentHome
    },{
        path:'catalog/:username',
        component: MainComponent
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
