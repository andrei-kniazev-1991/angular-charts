import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration, ChartData, registerables} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @Input() chartType: 'line' | 'bar' = 'line';
  @Input() selectedSensors: string[] = [];
  @Input() lineColors: string[] = [];

  private _data: number[] = [];

  get data(): number[] {
    return this._data;
  }

  @Input()
  set data(value: number[]) {
    this._data = value;
    this.renderChart();
    // If you want to trigger change detection explicitly, use ChangeDetectorRef
    this.changeDetectorRef.detectChanges();
  }

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chartInstance: Chart | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  private renderChart(): void {
    const canvas = this.chartCanvas.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      Chart.register(...registerables);

      const chartData: ChartData = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
        datasets: this.selectedSensors.map((sensor, index) => ({
          label: sensor,
          data: this._data,
          backgroundColor: this.lineColors[index],
          borderColor: this.lineColors[index],
          fill: false
        }))
      };

      const chartConfig: ChartConfiguration = {
        type: this.chartType,
        data: chartData
      };

      // Destroy the existing chart instance before creating a new one
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, chartConfig);
    }
  }
}
