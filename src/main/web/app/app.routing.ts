import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {EventListComponent} from './events/browser/event-list.component';
import {EventDetailsComponent} from './events/detailed/event-details.component';
import {RegistrationSuccess} from './registration/registration-success.component';
import {LoginSuccess} from './login/login-success.component';
import {EventCreateComponent} from './events/create/event-create.component';

import {AuthGuard} from './app.auth-guard.service';
import {LoginService} from './login/login.service';

/* TODO: Układać to ładnie i po kolei*/
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'hello', component: HelloComponent},
    {path: 'user', component: UserComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'registration/success', component: RegistrationSuccess},
    {path: 'login', component: LoginComponent},
    {path: 'login/success', component: LoginSuccess},
    {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'events', component: EventListComponent, canActivate: [AuthGuard]},
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [AuthGuard]},
    {path: 'events/create/new', component: EventCreateComponent, canActivate: [AuthGuard]}
];

export const appRouterProviders = [AuthGuard, LoginService];

export const routing: ModuleWithProviders =
  RouterModule.forRoot(appRoutes);
