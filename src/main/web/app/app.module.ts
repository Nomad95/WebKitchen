import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing, appRouterProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavbarComponent } from './side_navbar/side-navbar.component';


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
                 SideNavbarComponent],
    imports: [BrowserModule,
              FormsModule,
              ReactiveFormsModule,
              HttpModule,
              AlertModule.forRoot(),
              DatepickerModule.forRoot(),
              routing],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        appRouterProviders,
        [{provide: APP_BASE_HREF, useValue: '/'}],
        [{provide: LocationStrategy, useClass: PathLocationStrategy}]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
