import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, model, signal, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Displayable } from './model/Displayable.model';
import { Direction } from './model/direction.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pick-list-drag-and-drop2',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickListDragAndDrop2Component),
      multi: true
    }
  ],
  templateUrl: './pick-list-drag-and-drop2.component.html',
  styleUrl: './pick-list-drag-and-drop2.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PickListDragAndDrop2Component<T extends Displayable> implements ControlValueAccessor {
  
  public writeValue(value: T[]): void {
    if(!value) return;

    this.rightItems.set(value);
    this.leftItems.update(items => items.filter(item => !value.includes(item)))
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public readonly leftItems = model.required<T[]>({ alias: 'items' });
  public readonly rightItems = signal<T[]>([]);
  public readonly originTitle = input<string>('Origin');
  public readonly targetTitle = input<string>('Target');
  private readonly disabled = signal<boolean>(false);

  private onChange = (value: T[]) => {};
  private onTouched = () => {};

  // Track selected items in both lists
  selectedLeftItems: T[] = [];
  selectedRightItems: T[] = [];

  public readonly direction = Direction;

  /**
   * Handles the drop event when an item is dragged between lists
   */
  public drop(event: CdkDragDrop<T[]>) {
    if (event.previousContainer === event.container) {
      // Item moved within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (this.isSingleItemDrag(event)) { // Item moved between lists
      // Single item drag - move just the dragged item
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Multi-item drag - move all selected items
      this.handleMultiItemDrag(event);
    }
    

    // Clear selections after drag
    this.clearSelections();
  }

  /**
   * Check if a single item is being dragged (not part of a multi-select)
   */
  private isSingleItemDrag(event: CdkDragDrop<T[]>): boolean {
    const sourceList = event.previousContainer.id === 'cdk-drop-list-0' ? Direction.LEFT : Direction.RIGHT;
    const draggedItem = event.item.data;

    return sourceList === Direction.LEFT
      ? !this.selectedLeftItems.includes(draggedItem) || this.selectedLeftItems.length === 0
      : !this.selectedRightItems.includes(draggedItem) || this.selectedRightItems.length === 0;
  }

  /**
   * Handle dragging multiple selected items between lists
   */
  private handleMultiItemDrag(event: CdkDragDrop<T[]>) {
    const sourceList = event.previousContainer.id === 'cdk-drop-list-0' ? Direction.LEFT : Direction.RIGHT;
    const draggedItem = event.item.data;
    const selectedItems = sourceList === Direction.LEFT ? this.selectedLeftItems : this.selectedRightItems;

    // If dragged item is not in selected items, just move that item
    if (!selectedItems.includes(draggedItem)) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return;
    }

    // Get indices of all selected items in the source list
    const selectedIndices = selectedItems.map(item =>
      event.previousContainer.data.findIndex(listItem => listItem.id === item.id)
    ).filter(index => index !== -1).sort((a, b) => a - b);

    // Move all selected items, adjusting indices as we go
    for (let i = 0; i < selectedIndices.length; i++) {
      // Adjust for items already removed
      const adjustedIndex = selectedIndices[i] - i;
      const item = event.previousContainer.data[adjustedIndex];

      // Remove from source list
      event.previousContainer.data.splice(adjustedIndex, 1);

      // Add to target list at the appropriate position
      const targetIndex = event.currentIndex > event.previousIndex ? event.currentIndex - i : event.currentIndex;
      event.container.data.splice(targetIndex, 0, item);
    }
  }

  /**
   * Toggle item selection
   */
  public toggleSelect(item: T, list: Direction): void {
    if (list === Direction.LEFT) {
      const index = this.selectedLeftItems.findIndex(i => i.id === item.id);
      if (index === -1) {
        this.selectedLeftItems.push(item);
      } else {
        this.selectedLeftItems.splice(index, 1);
      }
    } else {
      const index = this.selectedRightItems.findIndex(i => i.id === item.id);
      if (index === -1) {
        this.selectedRightItems.push(item);
      } else {
        this.selectedRightItems.splice(index, 1);
      }
    }
  }

  /**
   * Check if an item is selected
   */
  public isSelected(item: T, list: Direction): boolean {
    if (list === Direction.LEFT) {
      return this.selectedLeftItems.some(({ id }) => id === item.id);
    } else {
      return this.selectedRightItems.some(({ id }) => id === item.id);
    }
  }

  /**
   * Check if a list has any selected items
   */
  public hasSelectedItems(list: Direction): boolean {
    return list === Direction.LEFT
      ? this.selectedLeftItems.length > 0
      : this.selectedRightItems.length > 0;
  }

  /**
   * Move selected items from left to right
   */
  public moveSelectedToRight(): void {
    if (this.selectedLeftItems.length === 0) return;

    // Add all selected items to right list
    this.rightItems.update(rightItems => {
      const updated = [...rightItems, ...this.selectedLeftItems];
      this.onChange(updated);
      return updated;
    });


    // Remove selected items from left list
    this.leftItems.update(leftItems => leftItems.filter(
      item => !this.selectedLeftItems.some(selected => selected.id === item.id)
    ));

    // Clear selection
    this.clearSelections();
    this.onTouched();
  }

  public moveAllToRight(): void {
    this.selectedLeftItems = this.leftItems();
    this.moveSelectedToRight();
  }

  /**
   * Move selected items from right to left
   */
  public moveSelectedToLeft(): void {
    if (this.selectedRightItems.length === 0) return;

    // Add all selected items to left list
    this.leftItems.update(leftItems => [...leftItems, ...this.selectedRightItems]);

    // Remove selected items from right list
    this.rightItems.update(rightItems => {
      const updated = rightItems.filter(
      item => !this.selectedRightItems.some(({ id }) => id === item.id));
      this.onChange(updated);
      return updated;
    });

    // Clear selection
    this.clearSelections();
    this.onTouched();
  }

  public moveAllToLeft(): void {
    this.selectedRightItems = this.rightItems();
    this.moveSelectedToLeft();
  }

  /**
   * Clear all selections
   */
  public clearSelections(): void {
    this.selectedLeftItems = [];
    this.selectedRightItems = [];
  }
}
