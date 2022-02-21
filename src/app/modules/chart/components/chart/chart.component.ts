import { Component, Input } from '@angular/core';
import { Chart } from 'src/app/model/chart.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() set setCryptoDetail(value: Chart) {
    this.cryptoDetail = value;
    console.log('value', value)
  }
  @Input() selectedTabName: string;
  cryptoDetail: Chart;

  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  yAxisLabel = 'USD';

  colorScheme = {
    domain: ['#4caf50', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
}
