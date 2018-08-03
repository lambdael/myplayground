import { point, Translate, PxM } from './MyLenearAlgebra';
import { CSSProperties } from 'react';
import { Output, DataflowNode, Input } from './api';

export const rectStyle = { fill: '#220640', stroke: 'blue', strokeWidth: 2 };
export const selected = { fill: '#330640', stroke: 'white', strokeWidth: 2 };
export const UIRectStyle = { fill: '#00000000', opacity: 0.1, stroke: 'black', strokeWidth: 1 };
export const edgeStyle = { fill: 'none', stroke: 'green', strokeWidth: 3 };

export class Settings {
  fontSize: number;
  screenUnit: number;
  screenRatio: point;
  portSize: number;
  labelHight: number;
  listMargin: number;
  nodeRatio: point;
}
export const myS: Settings = {
  fontSize: 15,
  screenUnit: 60,
  screenRatio: { x: 16, y: 9 },
  labelHight: 20,
  portSize: 15,
  listMargin: 4,
  nodeRatio: { x: 2, y: 1 },

};
export const nonselectableText: CSSProperties = {
  cursor: 'pointer',
  color: 'black',
  marginLeft: '0px',
  marginTop: '0px',
  marginBottom: '0px',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
  fill: '#998933',
};

export function outputsListMat(screenUnit: number) {
  return Translate(screenUnit * (myS.screenRatio.x - myS.nodeRatio.x), 20);
}
export function nodesListMat(screenUnit: number) {
  return Translate(screenUnit * myS.screenRatio.x / 2, 20);
}
export function inputsListMat(screenUnit: number) {
  return Translate(0, 100);
}
export function calcInputPortPointInList(i: Input, ns: DataflowNode[]): point {
  let index = ns.findIndex((value: DataflowNode) => {
    return i.parentnode.id === value.id;
  });
  let x = myS.portSize / 2;
  let y = myS.labelHight * (index + 1);
  let p = { x: x, y: y };
  if (index >= 0 && ns.length > 0 && (ns[index].matrix)) {
    let result = PxM(p, (ns[index].matrix));
    return result;
  } else {
    return p;
  }
}
export function calcOutputPortPointInList(i: Output, ns: DataflowNode[], nodeWidth: number): point {
  let index = ns.findIndex((value: DataflowNode) => {
    return i.parentnode.id === value.id;
  });
  let x = nodeWidth - (myS.portSize / 2);
  let y = myS.labelHight * (index + 1);
  let p = { x: x, y: y };
  if (index >= 0 && ns.length > 0 && (ns[index].matrix)) {
    let result = PxM(p, (ns[index].matrix));
    return result;
  } else {
    return p;
  }
}