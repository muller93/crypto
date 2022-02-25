import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginModule {}
