import { MySVGMatrix, ident } from './MyLenearAlgebra';
import { DataflowNode, Edge, NodePlace, Output, Input } from './api';

export interface DraggingState {
  dfeState: DataflowEditorDragState;
  posX: number;
  posY: number;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  screenUnit: number;
  connecting: {
    in?: Input;
    out?: Output;
  };
}

export enum DataflowEditorDragState {
  idle,
  panning,
  movingNodes,
  drawingEdge,
}

export const initDrag = {
  dfeState: DataflowEditorDragState.idle,
  posX: 0,
  posY: 0,
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  screenUnit: 60,
  connecting: { in: undefined, out: undefined }
};

export class DataflowState {
  constructor(
    public procsMat: MySVGMatrix,
    public inputsMat: MySVGMatrix,
    public outputsMat: MySVGMatrix,
    public nodes: DataflowNode[],
    public edges: Edge[],
    public testnum: number,
    public drag: DraggingState,
  ) { }
}
export function outputs(s: DataflowState): DataflowNode[] {
  return s.nodes.
    filter((value: DataflowNode) => value.place == NodePlace.OutPuts);
}
export function inputs(s: DataflowState): DataflowNode[] {
  return s.nodes.filter((value: DataflowNode) => value.place == NodePlace.Inputs);
}
export function procs(s: DataflowState): DataflowNode[] {
  return s.nodes.filter((value: DataflowNode) => value.place == NodePlace.Procs);
}

export const initialDF = new DataflowState(
  ident,
  ident,
  ident,
  new Array<DataflowNode>(),
  new Array<Edge>(),
  12,
  initDrag,
);
