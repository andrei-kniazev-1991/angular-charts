import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {DisableButtonDirective} from './disable-button.directive';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';

@Component({
  template: '<button [appDisableButton]="{ isViewerDisabled: true, viewerTooltip: \'Tooltip\' }"></button>'
})
class TestComponent {
}

describe('DisableButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let buttonDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisableButtonDirective, TestComponent],
      imports: [MatTooltipModule],
      providers: [MatTooltip]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    buttonDebugElement = fixture.debugElement.query(By.css('button'));
  });

  it('should create an instance', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    expect(directive).toBeTruthy();
  });

  it('should create an instance', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    expect(directive).toBeTruthy();
  });

  it('should set isDisabled to true when isViewerDisabled is true', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    directive.isViewerDisabled = true;
    expect(directive.isDisabled).toBe(true);
  });

  it('should set isDisabled to false when isViewerDisabled is false', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    directive.isViewerDisabled = false;
    expect(directive.isDisabled).toBe(false);
  });

  it('should set cursor to "not-allowed" when isViewerDisabled is true', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    directive.isViewerDisabled = true;
    expect(directive.cursor).toBe('not-allowed');
  });

  it('should set cursor to "pointer" when isViewerDisabled is false', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    directive.isViewerDisabled = false;
    expect(directive.cursor).toBe('pointer');
  });

  it('should show tooltip on hover when isViewerDisabled is true', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    directive.isViewerDisabled = true;

    const spy = spyOn(directive['tooltip'], 'show').and.callThrough();

    directive.onMouseEnter();
    expect(spy).toHaveBeenCalled();
  });

  it('should not show tooltip on hover when isViewerDisabled is false', () => {
    const directive = buttonDebugElement.injector.get(DisableButtonDirective);
    directive.isViewerDisabled = false;

    const spy = spyOn(directive['tooltip'], 'show').and.callThrough();

    directive.onMouseEnter();
    expect(spy).not.toHaveBeenCalled();
  });
});
