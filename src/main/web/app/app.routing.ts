import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'hello', component: HelloComponent},
    {path: 'user', component: UserComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent}
];

export const appRouterProviders: any[] = [];

export const routing: ModuleWithProviders =
  RouterModule.forRoot(appRoutes);
