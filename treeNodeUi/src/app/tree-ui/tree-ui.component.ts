import { Component, signal } from '@angular/core';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { CommonModule } from '@angular/common';
import { Node } from '../interfaces/node.interface';

@Component({
  selector: 'app-tree-ui',
  standalone: true,
  imports: [CommonModule, TreeNodeComponent],
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

  selectedNodeLabel = signal<string>('Select Node');

  onNodeSelected(node: Node): void {
    this.selectedNodeLabel.set(node.label);
  }
}
