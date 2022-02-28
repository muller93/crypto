import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TabModule } from './modules/tab/tab.module';
import { CommonModule } from '@angular/common';
import { LoginModule } from './modules/login/login.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CryptoInterceptor } from './crypto-interceptor.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabModule,
    LoginModule,
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CryptoInterceptor, multi: true },
  ],
})
export class AppModule {}
