import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Item {
  id: number;
  name: string;
}

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
  templateUrl: './pick-list-drag-and-drop2.component.html',
  styleUrl: './pick-list-drag-and-drop2.component.scss'
})
export class PickListDragAndDrop2Component implements OnInit {

  leftItems: Item[] = [];
  rightItems: Item[] = [];

  // Track selected items in both lists
  selectedLeftItems: Item[] = [];
  selectedRightItems: Item[] = [];

  ngOnInit(): void {
    // Initialize with sample data
    this.leftItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
      { id: 5, name: 'Item 5' },
      { id: 6, name: 'Item 6' },
      { id: 7, name: 'Item 7' },
      { id: 8, name: 'Item 8' }
    ];
    this.rightItems = [
      { id: 9, name: 'Item 9' },
      { id: 10, name: 'Item 10' }
    ];
  }

  /**
   * Handles the drop event when an item is dragged between lists
   */
  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      // Item moved within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Item moved between lists
      if (this.isSingleItemDrag(event)) {
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
    }

    // Clear selections after drag
    this.clearSelections();
  }

  /**
   * Check if a single item is being dragged (not part of a multi-select)
   */
  private isSingleItemDrag(event: CdkDragDrop<Item[]>): boolean {
    const sourceList = event.previousContainer.id === 'cdk-drop-list-0' ? 'left' : 'right';
    const draggedItem = event.item.data;

    return sourceList === 'left'
      ? !this.selectedLeftItems.includes(draggedItem) || this.selectedLeftItems.length === 0
      : !this.selectedRightItems.includes(draggedItem) || this.selectedRightItems.length === 0;
  }

  /**
   * Handle dragging multiple selected items between lists
   */
  private handleMultiItemDrag(event: CdkDragDrop<Item[]>) {
    const sourceList = event.previousContainer.id === 'cdk-drop-list-0' ? 'left' : 'right';
    const draggedItem = event.item.data;
    const selectedItems = sourceList === 'left' ? this.selectedLeftItems : this.selectedRightItems;

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
  toggleSelect(item: Item, list: 'left' | 'right'): void {
    if (list === 'left') {
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
  isSelected(item: Item, list: 'left' | 'right'): boolean {
    if (list === 'left') {
      return this.selectedLeftItems.some(i => i.id === item.id);
    } else {
      return this.selectedRightItems.some(i => i.id === item.id);
    }
  }

  /**
   * Check if a list has any selected items
   */
  hasSelectedItems(list: 'left' | 'right'): boolean {
    return list === 'left'
      ? this.selectedLeftItems.length > 0
      : this.selectedRightItems.length > 0;
  }

  /**
   * Move selected items from left to right
   */
  moveSelectedToRight(): void {
    if (this.selectedLeftItems.length === 0) return;

    // Add all selected items to right list
    this.rightItems = [...this.rightItems, ...this.selectedLeftItems];

    // Remove selected items from left list
    this.leftItems = this.leftItems.filter(
      item => !this.selectedLeftItems.some(selected => selected.id === item.id)
    );

    // Clear selection
    this.clearSelections();
  }

  /**
   * Move selected items from right to left
   */
  moveSelectedToLeft(): void {
    if (this.selectedRightItems.length === 0) return;

    // Add all selected items to left list
    this.leftItems = [...this.leftItems, ...this.selectedRightItems];

    // Remove selected items from right list
    this.rightItems = this.rightItems.filter(
      item => !this.selectedRightItems.some(selected => selected.id === item.id)
    );

    // Clear selection
    this.clearSelections();
  }

  /**
   * Clear all selections
   */
  clearSelections(): void {
    this.selectedLeftItems = [];
    this.selectedRightItems = [];
  }
}
