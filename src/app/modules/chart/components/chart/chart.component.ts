import { Component, Input } from '@angular/core';
import { Chart } from 'src/app/model/chart.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent {
  @Input() set setCryptoChart(value: Chart) {
    this.cryptoChart = value;
  }
  @Input() selectedTabName: string;
  cryptoChart: Chart;

  view: number[] = [700, 400];

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
