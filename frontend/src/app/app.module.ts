import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { DiscussionComponent } from './components/discussion/discussion.component';
import { WelcomeComponent } from './components/welcom/welcome.component';
import {AppRoutingModule} from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbChatModule,
  NbCardModule,
  NbInputModule, NbButtonModule, NbToastrService, NbToastrModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {ReactiveFormsModule} from "@angular/forms";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {environment} from "../environments/environment";


const config: SocketIoConfig = { url: environment.serverUrl, options: {withCredentials: environment.production, } };


@NgModule({
  declarations: [
    AppComponent,
    DiscussionComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    NbChatModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
  ],
  providers: [NbToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
