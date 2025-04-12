import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'pick-list-drag-and-drop',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, CdkDropListGroup, MatButtonModule, MatIconModule],
  templateUrl: './pick-list-drag-and-drop.component.html',
  styleUrl: './pick-list-drag-and-drop.component.scss'
})
export class PickListDragAndDropComponent {
  public origin: string[] = ['Item1', 'Item2', 'Item3'];
  public target: string[] = ['Item4', 'Item5', 'Item6'];

  public onDrop(event: CdkDragDrop<string[]>): void {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
