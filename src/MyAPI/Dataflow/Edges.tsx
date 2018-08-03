import { Output, DataflowNode, Edge, Input } from './api';
import { PxM, point, MxM } from './MyLenearAlgebra';
import { MyProps } from '../Container';
import { calcInputPortPointInList, calcOutputPortPointInList, edgeStyle, outputsListMat, nodesListMat, inputsListMat } from './Settings';
import * as React from 'react';
import { inputs, outputs } from './data';

export function EdgesView(props: { myp: MyProps, es: Edge[], screenUnit: number }) {
  let os = outputs(props.myp.dataflow);
  let is = inputs(props.myp.dataflow);
  let nodes = props.myp.dataflow.nodes;
  let su = props.screenUnit;
  let nodeWidth = su;
  let omat = outputsListMat(su);
  let pmat = MxM(nodesListMat(su), props.myp.dataflow.procsMat);
  let imat = inputsListMat(su);
  let inputsInOutputs = os.reduce(
    (previousValue: Input[], currentValue: DataflowNode) => {
      return previousValue.concat(currentValue.inputs);
    }, []);
  let inps = inputsInOutputs.map(
    (value: Input) => {
      return { input: value, p: PxM(calcInputPortPointInList(value, os), omat) };
    }
  );
  let inputsInNodes = nodes.reduce(
    (previousValue: Input[], currentValue: DataflowNode) => {
      return previousValue.concat(currentValue.inputs);
    }, []);
  inps = inps.concat(inputsInNodes.map(
    (value: Input) => {
      return {
        input: value, p: PxM(calcInputPortPointInList(value, nodes),
          pmat)
      };
    }
  ));

  let outputsInInputs = is.reduce(
    (previousValue: Output[], currentValue: DataflowNode) => {
      return previousValue.concat(currentValue.outputs);
    }, []);
  let outps = outputsInInputs.map(
    (value: Output) => {
      return { output: value, p: PxM(calcOutputPortPointInList(value, is, nodeWidth), imat) };
    }
  );
  let outputsInNodes = nodes.reduce(
    (previousValue: Output[], currentValue: DataflowNode) => {
      return previousValue.concat(currentValue.outputs);
    }, []);
  outps = outps.concat(outputsInNodes.map(
    (value: Output) => {
      return { output: value, p: PxM(calcOutputPortPointInList(value, nodes, nodeWidth), pmat) };
    }
  ));

  let ss = props.es.map((e: Edge): EdgeProp => {

    let start = inps.find((value: { input: Input, p: point }) => {
      return e.input.id === value.input.id;
    });

    let end = outps.find((value: { output: Output, p: point }) => {
      return e.output.id === value.output.id;
    });
    if (start && end) {
      return { line: { start: start.p, end: end.p }, edge: e };
    } else {
      return { line: { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }, edge: e };
    }
  });
  let sss = ss.map((value: EdgeProp) => {
    return <EdgeView key={value.edge.id} {...value} />
      ;
  });

  return (
    <g >
      {sss}
    </g >
  );
}
export interface EdgeProp {
  line: { start: point, end: point };
  edge: Edge;
}

export function EdgeView(props: EdgeProp) {
  let ss =
    'M' + props.line.start.x + ' ' + props.line.start.y +
    ' L' + props.line.end.x + ' ' + props.line.end.y
    ;
  return (
    <path d={ss} style={edgeStyle} />
  );

}