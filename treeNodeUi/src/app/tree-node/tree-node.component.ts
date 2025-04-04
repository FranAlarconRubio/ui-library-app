import { CommonModule } from '@angular/common';
import { Component, input, Input, signal } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  
  public node = input<any>();
  
  private readonly _$isExpanded = signal(false);
  public readonly $isExpanded = this._$isExpanded.asReadonly();

  public toggleExpand(): void {
    this._$isExpanded.update((prev) => !prev);
  }
}
