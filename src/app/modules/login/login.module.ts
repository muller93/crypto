import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    ComponentsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
