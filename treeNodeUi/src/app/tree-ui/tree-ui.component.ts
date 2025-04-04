import { Component, signal } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { CommonModule } from '@angular/common';
import { Node } from '../interfaces/node.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tree-ui',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent, ReactiveFormsModule],
  templateUrl: './tree-ui.component.html',
  styleUrls: ['./tree-ui.component.scss']
})
export class TreeUiComponent {
  treeData: Node[] = [
    {
      label: 'Node 1',
      children: [
        { label: 'Child 1.1' },
        { label: 'Child 1.2' }
      ]
    },
    {
      label: 'Node 2',
      children: [
        { label: 'Child 2.1' },
        { label: 'Child 2.2' }
      ]
    }
  ];

  selectedNodeControl = new FormControl<string | null>(null);

  onNodeSelected(node: Node): void {
    this.selectedNodeControl.setValue(node.label);
  }
}
