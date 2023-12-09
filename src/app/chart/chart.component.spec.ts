import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { MatCardModule } from '@angular/material/card';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chart with provided data', () => {
    component.chartType = 'line';
    component.selectedSensors = ['Sensor 1', 'Sensor 2'];
    component.lineColors = ['red', 'blue'];
    component.data = [10, 20, 30, 40];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('canvas')).toBeTruthy();
  });

  it('should destroy existing chart instance when data changes', () => {
    const destroySpy = spyOn<any>(component['chartInstance'], 'destroy').and.callThrough();

    component.chartType = 'bar';
    component.selectedSensors = ['Sensor 3', 'Sensor 4'];
    component.lineColors = ['green', 'yellow'];
    component.data = [50, 60, 70, 80];

    fixture.detectChanges();

    expect(destroySpy).toHaveBeenCalled();
  });

  it('should handle empty data gracefully', () => {
    component.chartType = 'line';
    component.selectedSensors = ['Empty Sensor'];
    component.lineColors = ['black'];
    component.data = [];

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('canvas')).toBeTruthy();
  });
});
