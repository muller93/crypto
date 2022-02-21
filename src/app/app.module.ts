import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TabModule } from './modules/tab/tab.module';
import { TabComponent } from './modules/tab/components/tab/tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewModule } from './modules/new/new.module';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './modules/login/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartComponent } from './modules/chart/components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExchangeComponent } from './modules/exchange/components/exchange/exchange.component';
@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    LoginComponent,
    ChartComponent,
    ExchangeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TabModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    NewModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxChartsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
