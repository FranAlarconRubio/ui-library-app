import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeUiComponent } from "./tree-ui/tree-ui.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TreeUiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'treeNodeUi';
}
