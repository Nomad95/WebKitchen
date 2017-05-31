import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {LocationStrategy, PathLocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import {JQ_TOKEN} from './events/j-query.service';
import { routing, appRouterProviders } from './app.routing';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { Tabset } from './tabs/Tabset';
import { Tab } from './tabs/Tab';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavbarComponent } from './side_navbar/side-navbar.component';
import {EventListComponent} from './events/browser/event-list.component';
import {EventGeneralComponent} from './events/browser/event.component';
import {EventDetailsComponent} from './events/detailed/event-details.component';
import {RegistrationSuccess} from './registration/registration-success.component';
import {LoginSuccess} from './login/login-success.component';

import { SelectModule } from "ng2-select";
import {LoginSuccess} from './login/login-success.component';

import {EventCreateComponent} from './events/create/event-create.component';
import {SimpleListComponent} from './util/list/simple-list.component';

import {AuthGuard} from './app.auth-guard.service';

declare let jQuery:Object;


@NgModule({
    declarations: [AppComponent,
                   HelloComponent,
                   CalendarComponent,
                   HomeComponent,
                 UserComponent,
                 RegistrationComponent,
                 LoginComponent,
                 ProfileComponent,
                 NavbarComponent,
                 EventListComponent,
                 Tabset,
                 Tab,
        EventGeneralComponent,
        SideNavbarComponent,
        EventDetailsComponent,
        RegistrationSuccess,
        LoginSuccess,
        EventCreateComponent,
        SimpleListComponent
    ],
    imports: [BrowserModule,
              FormsModule,
              ReactiveFormsModule,
              HttpModule,
              SelectModule,
              AlertModule.forRoot(),
              DatepickerModule.forRoot(),
              routing],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AuthGuard,
        appRouterProviders,
        [{provide: APP_BASE_HREF, useValue: '/'}],
        [{provide: LocationStrategy, useClass: HashLocationStrategy}],
        [{provide: JQ_TOKEN, useValue: jQuery}]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
