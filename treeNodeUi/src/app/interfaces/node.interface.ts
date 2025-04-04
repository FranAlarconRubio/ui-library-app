export interface Node {
    label: string; // Etiqueta del nodo
    children?: Node[]; // Lista de nodos hijos (opcional)
}