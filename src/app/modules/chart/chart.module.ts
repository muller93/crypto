import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [NgxChartsModule, CommonModule],
})
export class ChartModule {}
