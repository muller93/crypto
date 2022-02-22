import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './components/tab/tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ListModule } from '../list/list.module';
import { ChartModule } from '../chart/chart.module';
import { ExchangeModule } from '../exchange/exchange.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TabComponent],
  exports: [TabComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    ListModule,
    ChartModule,
    ExchangeModule,
    MatDialogModule,
  ],
})
export class TabModule {}
