export interface Node {
  id: string; // Identificador único del nodo
  label: string; // Etiqueta del nodo
  children?: Node[]; // Lista de nodos hijos (opcional)
}