import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {LocationStrategy, PathLocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import {JQ_TOKEN} from './events/j-query.service';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from "ng2-select";
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { RecaptchaModule } from 'ng2-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule } from 'angular2-toaster';

import { routing, appRouterProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './profile/changePassword/change-password.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './profile/myProfile/myProfile.component';
import { ProfileComponent } from './profile/userProfile/profile.component';
import { Tabset } from './tabs/Tabset';
import { Tab } from './tabs/Tab';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavbarComponent } from './side_navbar/side-navbar.component';
import {EventListComponent} from './events/browser/event-list.component';
import {EventGeneralComponent} from './events/browser/event.component';
import {EventDetailsComponent} from './events/detailed/event-details.component';
import {RegistrationSuccess} from './registration/registration-success.component';
import {LoginSuccess} from './login/login-success.component';
import {EventCreateComponent} from './events/create/event-create.component';
import {SimpleListComponent} from './util/list/simple-list.component';
import {ProfileEventsComponent} from './events/profile/profile-events.component';
import {UserParticipateEventsComponent} from "./events/profile/user-participate-events.component";
import {UserCreatedEventsComponent} from "./events/profile/user-created-events.component";
import { AdminComponent } from './admin/admin.component'
import { AdminPanelUEComponent } from './adminPanelUE/adminPanelUE.component'
import {DetailsReceivedMessagesComponent} from "./messages/details/details-received-message.component";
import {DetailsSentMessagesComponent} from "./messages/details/details-sent-message.component";
import {SendingMessageComponent} from "./messages/sending/sending-message.component";
import {ReceivedMessagesComponent} from "./messages/received/received-messages.component";
import {SentMessagesComponent} from "./messages/sent/sent-messages.component";
import {MessageBoxSentComponent} from "./messages/messagebox/messagebox-sent.component";
import {MessageBoxComponent} from "./messages/messagebox/messagebox.component";
import {LoginService} from "./login/login.service";
import {ConfirmRegistrationComponent} from "./registration/confirmation/confirm.registration.component";
import { RecaptchaModule } from 'ng2-recaptcha';
import {CaptchaComponent} from "./captcha-test/captcha.component";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AlertComponent } from './profile/myProfile/username-changed-alert.component';
import {ImageCropperComponent} from 'ng2-img-cropper';
import {CropperSettings} from 'ng2-img-cropper';
import {Bounds} from 'ng2-img-cropper';
import {UploadPhotoComponent} from './profile/uploadPhoto/upload-photo.component';
import {ProfilePhotoAlertComponent} from './profile/uploadPhoto/profile-photo-not-changed-alert.component';

import {AuthGuard} from './app.auth-guard.service';
import {LoginBanned} from "./login/login-banned-user.component";
import {SharedService} from "./shared.service";
import { ToasterService } from 'angular2-toaster';

import {PolishDatePipe} from "./util/pipes/polish.date.pipe";
import {ShorterTimePipe} from "./util/pipes/shorter.time.pipe";

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
        HelloComponent,
        CalendarComponent,
        SimpleListComponent,
        HomeComponent,
        EventCreateComponent,
        UserCreatedEventsComponent,
        UserParticipateEventsComponent,
        ProfileEventsComponent,
        UserComponent,
        ConfirmRegistrationComponent,
        RegistrationComponent,
        LoginComponent,
        MyProfileComponent,
        NavbarComponent,
        EventListComponent,
        EventGeneralComponent,
        SideNavbarComponent,
        EventDetailsComponent,
        RegistrationSuccess,
        LoginSuccess,
        LoginBanned,
        AlertComponent,
        AdminComponent,
        AdminPanelUEComponent,
        PolishDatePipe,
        ShorterTimePipe,
        SendingMessageComponent,
        ReceivedMessagesComponent,
        SentMessagesComponent,
        MessageBoxComponent,
        MessageBoxSentComponent,
        DetailsReceivedMessagesComponent,
        DetailsSentMessagesComponent,
        ImageCropperComponent,
        UploadPhotoComponent,
        ProfilePhotoAlertComponent
    ],
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NguiDatetimePickerModule,
        BrowserAnimationsModule,
        HttpModule,
        SelectModule,
        MyDatePickerModule,
        ChangePasswordComponent,
        ToasterModule,
        RecaptchaModule.forRoot(),
        AlertModule.forRoot(),
        DatepickerModule.forRoot(),
        BootstrapModalModule,
        routing],
    entryComponents: [AlertComponent, ProfilePhotoAlertComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AuthGuard,
        SharedService,
        appRouterProviders,
        LoginService,
        ToasterService,
        [{provide: APP_BASE_HREF, useValue: '/'}],
        [{provide: LocationStrategy, useClass: HashLocationStrategy}],
        [{provide: JQ_TOKEN, useValue: jQuery}]
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}