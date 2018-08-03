import * as React from 'react';
import { MyProps } from '../Container';
import * as A from './actions';
import { point, Translate, PxM, toSVGString, ident, MySVGMatrix, MxM, } from './MyLenearAlgebra';
import { Transform } from 'stream';
import { NodeView } from './Node';
// tslint:disable-next-line:max-line-length
import { myS, edgeStyle, UIRectStyle, nodesListMat, inputsListMat, outputsListMat, calcInputPortPointInList, calcOutputPortPointInList } from './Settings';
import { MultiplyBlending } from 'three';
import { initDrag, DataflowEditorDragState, DataflowState, procs, inputs, outputs } from './data';
import { DataflowNode, Edge, Input, Output, NodePlace } from './api';
import { EdgeProp, EdgeView, EdgesView } from './Edges';

export function calcNodePos(props: { myp: MyProps, node: DataflowNode }): MySVGMatrix {

  if (props.node.place == NodePlace.Inputs) {
    let id = inputs(props.myp.dataflow).findIndex((value: DataflowNode, index: number, obj: DataflowNode[]) => value.id == props.node.id);
    props.node.matrix;
  }
  return props.node.matrix;
}

export function NodeListView(props: { myp: MyProps, ns: DataflowNode[], matrix: MySVGMatrix }) {
  let timer = props.myp.timer;
  let nodes = props.ns;
  let m = props.matrix;
  let c = nodes.length;
  let ss = timer.playngTime;
  let d = props.myp.dfActions;
  let height = myS.labelHight;

  const listItems = nodes.map((nn: DataflowNode, index: number) => <NodeView myp={props.myp} node={nn}></NodeView>
  );
  return (
    <g transform={toSVGString(m)}>
      {listItems}
    </g>
  );

}

export class DataflowView extends React.Component<MyProps, {}> {
  layoutList(ns: DataflowNode[], nodeheight: number) {
    ns.map((value: DataflowNode, index: number, array: DataflowNode[]) => {
      let y = ((index + 0) * nodeheight);
      value.matrix = Translate(0, y);
    }
    );
    //throw new Error("Method not implemented.");
  }
  constructor(p: MyProps) {
    super(p);
    let su = window.innerWidth / myS.screenRatio.x;
    // this.state = initDrag;
  }

  render() {
    let p = this.props;
    let s = p.dataflow.drag;
    let su = s.screenUnit;
    let n = p.dataflow;
    let nt = typeof (n);
    let timer = p.timer;
    let name = nt.toString();
    let a = p.timerActions;
    let ps = procs(n);
    let ins = inputs(n);
    let outs = outputs(n);
    let nodes = n.nodes;
    let edges = n.edges;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let vb = '0 0 ' + w.toString() + ' ' + h.toString();
    let rx = su * (myS.screenRatio.x - myS.nodeRatio.x);
    let lw = su * myS.nodeRatio.x;
    let nodeHeight = su * myS.nodeRatio.y;
    let tt = (<text dx='0' y='0'>aaaaa</text>) as React.SVGProps<SVGTextElement>
      ;
    let pmat = MxM(nodesListMat(su), n.procsMat);
    let omat = outputsListMat(su);
    let imat = inputsListMat(su);

    let testEdge = { line: { start: { x: 0, y: 0 }, end: { x: s.clientX - 1, y: s.clientY - 1 } }, edge: edges[0] } as EdgeProp;
    if (s.dfeState == DataflowEditorDragState.drawingEdge) {
      if (s.connecting.in) {
        let ip = calcInputPortPointInList(s.connecting.in, nodes);
        testEdge = { line: { start: { x: ip.x, y: ip.y }, end: { x: s.clientX - 1, y: s.clientY - 1 } }, edge: edges[0] } as EdgeProp;
      }
      if (s.connecting.out) {
        let op = calcOutputPortPointInList(s.connecting.out, nodes, 200);
        testEdge = { line: { start: { x: s.clientX - 1, y: s.clientY - 1 }, end: { x: op.x, y: op.y } }, edge: edges[0] } as EdgeProp;
      }
    }

    let bbox = tt.bbox;
    let mx = s.posX.toString();
    let layouted = this.layoutList(outs, su);
    if (nodes) {

      return (
        <svg transform={toSVGString(ident)} width={w} height={h} viewBox={vb}
        >
          <g onMouseDown={(event) => this.props.dfActions.onDFEMouseDown({ e: event })}
            onMouseMove={(event) => this.props.dfActions.onMouseMove({ e: event })}
            onMouseUp={(event) => this.props.dfActions.onMouseRelease({ e: event })}
          >
            <EdgeView {...testEdge} />

            <rect width={w} height={h} style={UIRectStyle} />
            {/* <text fill='red' x={100} y={100}> {mx}</text> */}
          </g>

          <g>
            <NodeListView myp={p} ns={outs} matrix={omat} />
          </g >
          <g>
            <NodeListView myp={p} ns={ps} matrix={pmat} />
          </g>
          <g>
            <NodeListView myp={p} ns={ins} matrix={imat} />
          </g>

          <g>
            <EdgesView myp={p} es={edges} screenUnit={su} />
          </g>

        </svg >
      );
    } else {
      return <div />;
    }
  }
}
