import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './profile/myProfile/myProfile.component';
import { ProfileComponent } from './profile/userProfile/profile.component';
import {EventListComponent} from './events/browser/event-list.component';
import {EventDetailsComponent} from './events/detailed/event-details.component';
import {RegistrationSuccess} from './registration/registration-success.component';
import {LoginSuccess} from './login/login-success.component';
import {EventCreateComponent} from './events/create/event-create.component';
import {ProfileEventsComponent} from "./events/profile/profile-events.component";

import {AuthGuard} from './app.auth-guard.service';
import {LoginService} from './login/login.service';
import {AdminComponent} from "./admin/admin.component";
import {AdminPanelUEComponent} from "./adminPanelUE/adminPanelUE.component";
import {LoginBanned} from "./login/login-banned-user.component";
import {SendingMessageComponent} from "./messages/sending/sending-message.component";
import {ReceivedMessagesComponent} from "./messages/received/received-messages.component";
import {MessageBoxComponent} from "./messages/messagebox/messagebox.component";
import {SentMessagesComponent} from "./messages/sent/sent-messages.component";
import {MessageBoxSentComponent} from "./messages/messagebox/messagebox-sent.component";
import {DetailsReceivedMessagesComponent} from "./messages/details/details-received-message.component";
import {DetailsSentMessagesComponent} from "./messages/details/details-sent-message.component";

/* TODO: Układać to ładnie i po kolei*/
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'hello', component: HelloComponent},
    {path: 'user', component: UserComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'registration/success', component: RegistrationSuccess},
    {path: 'login', component: LoginComponent},
    {path: 'login/success', component: LoginSuccess},
    {path: 'login/banned', component: LoginBanned},
    {path: 'login/banned/:date/:time', component: LoginBanned},
    {path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
    {path: 'profile/myprofile', component: MyProfileComponent, canActivate: [AuthGuard]},
    {path: 'profile/myprofile/events', component: ProfileEventsComponent, canActivate: [AuthGuard]},
    {path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'events', component: EventListComponent, canActivate: [AuthGuard]},
    {path: 'events/:id', component: EventDetailsComponent, canActivate: [AuthGuard]},
    {path: 'events/create/new', component: EventCreateComponent, canActivate: [AuthGuard]},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: "admin/panelUE", component: AdminPanelUEComponent, canActivate: [AuthGuard]},
    {path: "message/send", component: SendingMessageComponent, canActivate: [AuthGuard]},
    {path: "messagebox", component: MessageBoxComponent, canActivate: [AuthGuard]},
    {path: "messagebox/received", component: ReceivedMessagesComponent, canActivate: [AuthGuard]},
    {path: "messagebox/sent", component: SentMessagesComponent, canActivate: [AuthGuard]},
    {path: "messagebox/:indexFirstMsg", component: MessageBoxComponent, canActivate: [AuthGuard]},
    {path: "messagebox/sent/:indexFirstMsg", component: MessageBoxSentComponent, canActivate: [AuthGuard]},
    {path: "messagebox/received/details/:id", component: DetailsReceivedMessagesComponent, canActivate:[AuthGuard]},
    {path: "messagebox/sent/details/:id", component: DetailsSentMessagesComponent, canActivate:[AuthGuard]},

];

export const appRouterProviders = [AuthGuard, LoginService];

export const routing: ModuleWithProviders =
  RouterModule.forRoot(appRoutes);
