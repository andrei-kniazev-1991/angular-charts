import {Component, OnInit} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

interface ChartConfig {
  chartType: 'line' | 'bar';
  selectedSensors: string[];
  lineColors: string[];
  data: number[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  availableSensors: string[] = ['Temperature Sensor 1', 'Temperature Sensor 2', 'Humidity Sensor 1', 'Humidity Sensor 2', 'Light Sensor 1', 'Light Sensor 2'];

  charts: ChartConfig[] = [
    {chartType: 'line', selectedSensors: ['Temperature Sensor 1'], lineColors: ['blue'], data: []},
    {chartType: 'bar', selectedSensors: ['Humidity Sensor 1'], lineColors: ['green'], data: []},
    {chartType: 'line', selectedSensors: ['Light Sensor 1'], lineColors: ['orange'], data: []},
  ];

  onChartConfigChange(): void {
    this.updateChartData();
  }

  onDateChange(event: MatDatepickerInputEvent<any>): void {
    this.updateChartData();
  }

  ngOnInit() {
    this.updateChartData();
  }

  private updateChartData(): void {
    this.charts.forEach(chart => {
      chart.data = this.generateRandomData();
    });
  }

  private generateRandomData(): number[] {
    return Array.from({length: 4}, () => Math.floor(Math.random() * 100));
  }
}
