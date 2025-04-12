import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListDragAndDrop2Component } from './pick-list-drag-and-drop2.component';

describe('PickListDragAndDrop2Component', () => {
  let component: PickListDragAndDrop2Component;
  let fixture: ComponentFixture<PickListDragAndDrop2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickListDragAndDrop2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickListDragAndDrop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
