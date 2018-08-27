import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {UsersComponent} from './users/users.component';

import {KeycloakService, KeycloakAngularModule} from "keycloak-angular";
import {APP_INITIALIZER} from "@angular/core";
import {initializer} from './utils/app-init';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule {
}
