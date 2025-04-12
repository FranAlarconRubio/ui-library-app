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
      id: '1',
      label: 'Node 1',
      children: [
        {
          id: '1.1',
          label: 'Child 1.1',
          children: [
            {
              id: '1.1.1',
              label: 'Child 1.1.1',
              children: [
                {
                  id: '1.1.1.1',
                  label: 'Child 1.1.1.1',
                  children: [
                    { id:'1.1.1.1.1', label: 'Child 1.1.1.1.1' },
                    { id: '1.1.1.1.2', label: 'Child 1.1.1.1.2' }
                  ]
                },
                { id: '1.1.1.2', label: 'Child 1.1.1.2' }
              ]
            },
            { id: '1.1.2', label: 'Child 1.1.2' }
          ]
        },
        { id: '1.2', label: 'Child 1.2' }
      ]
    },
    {
      id: '2',
      label: 'Node 2',
      children: [
        {
          id: '2.1',
          label: 'Child 2.1',
          children: [
            {
              id: '2.1.1',
              label: 'Child 2.1.1',
              children: [
                { id: '2.1.1.1', label: 'Child 2.1.1.1' },
                { id: '2.1.1.2', label: 'Child 2.1.1.2' }
              ]
            }
          ]
        },
        { id: '2.2', label: 'Child 2.2' }
      ]
    }
  ];

  selectedNodeControl = new FormControl<string | null>(null);

  onNodeSelected(node: Node): void {
    this.selectedNodeControl.setValue(node.label);
  }
}
