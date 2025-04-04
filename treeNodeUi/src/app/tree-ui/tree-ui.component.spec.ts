import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeUiComponent } from './tree-ui.component';

describe('TreeUiComponent', () => {
  let component: TreeUiComponent;
  let fixture: ComponentFixture<TreeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
