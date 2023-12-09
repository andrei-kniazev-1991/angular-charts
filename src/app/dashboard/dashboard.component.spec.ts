import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard.component';
import {MatNativeDateModule} from "@angular/material/core";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatDatepickerModule, MatNativeDateModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data on chart config change', () => {
    let spy = spyOn<any>(component, 'updateChartData');
    component.onChartConfigChange();
    expect(spy).toHaveBeenCalled();
  });

  it('should update chart data on date change', () => {
    let spy = spyOn<any>(component, 'updateChartData');
    const event = {} as MatDatepickerInputEvent<any>;
    component.onDateChange(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should generate random data', () => {
    const data = component['generateRandomData']();
    expect(data.length).toBe(4);
    data.forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it('should update chart data when calling private method indirectly', () => {
    let spy = spyOn<any>(component, 'updateChartData');
    component.onChartConfigChange();
    expect(spy).toHaveBeenCalled();
  });
});
