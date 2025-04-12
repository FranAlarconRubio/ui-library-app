import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeUiComponent } from "./tree-ui/tree-ui.component";
import { PickListComponent } from "./pick-list/pick-list.component";
import { PickListDragAndDropComponent } from './pick-list-drag-and-drop/pick-list-drag-and-drop.component';
import { PickListDragAndDrop2Component } from './pick-list-drag-and-drop2/pick-list-drag-and-drop2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TreeUiComponent, PickListComponent, PickListDragAndDropComponent, PickListDragAndDrop2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'treeNodeUi';

  // Initialize with sample data
  leftItems = [
    { id: 1, name: 'Item 1', label: 'Item1' },
    { id: 2, name: 'Item 2', label: 'Item2' },
    { id: 3, name: 'Item 3', label: 'Item3' },
    { id: 4, name: 'Item 4', label: 'Item4' },
    { id: 5, name: 'Item 5', label: 'Item5' },
    { id: 6, name: 'Item 6', label: 'Item6' },
    { id: 7, name: 'Item 7', label: 'Item7' },
    { id: 8, name: 'Item 8', label: 'Item8' }
  ];

  rightItems = [
    { id: 9, name: 'Item 9', label: 'Item9' },
    { id: 10, name: 'Item 10', label: 'Item10' }
  ];
}
