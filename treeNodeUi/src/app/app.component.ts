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
}
