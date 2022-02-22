import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppComponent } from './app.component';
import { ChartComponent } from './modules/chart/components/chart/chart.component';
import { ExchangeComponent } from './modules/exchange/components/exchange/exchange.component';
import { ListComponent } from './modules/list/components/list/list.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { NewModule } from './modules/new/new.module';
import { TabComponent } from './modules/tab/components/tab/tab.component';
import { TabModule } from './modules/tab/tab.module';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    LoginComponent,
    ChartComponent,
    ExchangeComponent,
    ListComponent,
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
    MatTableModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
