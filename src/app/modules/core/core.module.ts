import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { ErrorMessageModule } from './error-message/error-message.module';

@NgModule({
  imports: [CommonModule, LoginModule, ErrorMessageModule],
  exports: [LoginModule, ErrorMessageModule],
})
export class CoreModule {}
