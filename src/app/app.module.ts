import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from './app.component';
import { NewModule } from './modules/new/new.module';
import { TabModule } from './modules/tab/tab.module';
import { ListModule } from './modules/list/list.module';
import { LoginModule } from './modules/login/login.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    NgxChartsModule,
    ListModule,
    LoginModule,
    NewModule,
    TabModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
