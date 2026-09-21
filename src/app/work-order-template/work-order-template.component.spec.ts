import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderTemplateComponent } from './work-order-template.component';

describe('WorkOrderTemplateComponent', () => {
  let component: WorkOrderTemplateComponent;
  let fixture: ComponentFixture<WorkOrderTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkOrderTemplateComponent]
    });
    fixture = TestBed.createComponent(WorkOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
