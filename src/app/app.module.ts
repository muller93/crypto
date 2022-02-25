import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NewModule } from './modules/new/new.module';
import { TabModule } from './modules/tab/tab.module';
import { ListModule } from './modules/list/list.module';
import { CommonModule } from '@angular/common';
import { LoginModule } from './modules/login/login.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ListModule,
    NewModule,
    TabModule,
    LoginModule,
    MatSnackBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
