import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pick-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './pick-list.component.html',
  styleUrl: './pick-list.component.scss'
})
export class PickListComponent {


  readonly leftItems = signal<string[]>(['Item1', 'Item2', 'Item3']);
  readonly rightItems = signal<string[]>([]);

  readonly selectedLeft = signal<string[]>([]);
  readonly selectedRight = signal<string[]>([]);

  moveRight(): void {
    debugger;
    const selected = this.selectedLeft();
    this.rightItems.update(items => [...items, ...selected]);
    this.leftItems.update(items =>  items.filter(item => !selected.includes(item)));
    this.selectedLeft.set([]);
  }

  moveLeft(): void {
    debugger;
    const selected = this.selectedRight();
    this.leftItems.update(items => [...items, ...selected]);
    this.rightItems.update(items => items.filter(item => !selected.includes(item)));
    this.selectedRight.set([]);
  }

  isLeftSelectionEmpty = computed(() => this.selectedLeft.length === 0);
  isRightSelectionEmpty = computed(() => this.selectedRight.length === 0);

  onOriginSelectionChanged(event: MatSelectionListChange): void {
    debugger;
    this.selectedLeft.set(event.source.selectedOptions.selected.map(i => i.value));
  }

  onTargetSelectionChanged(event: MatSelectionListChange): void {
    debugger;
    this.selectedRight.set(event.source.selectedOptions.selected.map(i => i.value));
  }

}
