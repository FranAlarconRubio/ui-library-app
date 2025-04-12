import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickListDragAndDropComponent } from './pick-list-drag-and-drop.component';

describe('PickListDragAndDropComponent', () => {
  let component: PickListDragAndDropComponent;
  let fixture: ComponentFixture<PickListDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickListDragAndDropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickListDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
