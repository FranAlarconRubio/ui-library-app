import { CommonModule } from '@angular/common';
import { Component, input, Input, output, signal } from '@angular/core';
import { Node } from '../interfaces/node.interface';

@Component({
  selector: 'app-tree-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrl: './tree-node.component.scss'
})
export class TreeNodeComponent {
  
  @Input() public node?: Node;
  @Input() public loadChildren?: ((node: Node) => Promise<Node[]>);

  public nodeSelected = output<Node>();
  
  private readonly _$isExpanded = signal(false);
  public readonly $isExpanded = this._$isExpanded.asReadonly();

  public async toggleExpand(): Promise<void> {
    if(!this.$isExpanded() && this.loadChildren && this.node && !this.node.children) {
      this.node!.children = await this.loadChildren(this.node!);
    }

    this._$isExpanded.update((prev) => !prev);
  }

  public selectNode(): void {
    this.nodeSelected.emit(this.node!);
  }
}
