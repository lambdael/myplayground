// ActionCreator
// import { Action } from 'redux';
import { actionCreatorFactory, Action, AnyAction, AsyncActionCreators, ActionCreatorFactory } from 'typescript-fsa';
import { MyAudioNode, Input, Edge, DataflowNode, NodePlace, Output } from './api';
import * as A from 'redux';
import { DataflowState, } from './data';
export const dfpattern = 'Dataflow';
export const dataflowActionCreator = actionCreatorFactory(dfpattern);
const dfaCreator = dataflowActionCreator;
export const DFActions = dfaCreator.name;
import { MouseEvent, } from 'react';
// idle -onNodeMouseDown> movingNodes -onMouseRelease> idle
// idle -onDFEMouseDown> movingEditor -onMouseRelease> idle
export type EV = MouseEvent<SVGElement>;

export const onOutputMouseDown =
  dfaCreator<{ o: Output, e: EV }>('onOutputMouseDown');
export const onInputMouseRelease =
  dfaCreator<{ i: Input, e: EV }>('onInputMouseRelease');
export const onNodeMouseDown =
  dfaCreator<{ node: DataflowNode, e: EV }>('onNodeMouseDown');
export const onDFEMouseDown =
  dfaCreator<{ e: EV }>('onDFEMouseDown');
export const onMouseMove =
  dfaCreator<{ e: EV }>('onMouseMove');
export const onMouseRelease =
  dfaCreator<{ e: EV }>('onMouseRelease');
export const addNode =
  dfaCreator.async<{ nodeType: string },
    { dataflow: DataflowState }
    >('addNode');
export const setNode =
  dfaCreator.async<{ node: DataflowNode },
    { dataflow: DataflowState }
    >('setNode');
export const setDataflow =
  dfaCreator.async<{ dataflow: DataflowState },
    { dataflow: DataflowState }
    >('setDataflow');
export const removeNode =
  dfaCreator.async<{ node: MyAudioNode },
    { dataflow: DataflowState }
    >('removeNode');
export const connect =
  dfaCreator.async<{ input: Input, output: Output },
    { dataflow: DataflowState }
    >('connect');
export const disconnect =
  dfaCreator.async<{ edge: Edge },
    { dataflow: DataflowState }
    >('disconnect');

export class DFActionDispatcher {
  constructor(private dispatch: (action: A.Action) => void) {

  }

  public addNode(val: { nodeType: string }) {
    this.dispatch(addNode.started(val));
  }

  public onOutputMouseDown(val: { o: Output, e: EV }) {
    this.dispatch(onOutputMouseDown(val));
  }
  public onInputMouseRelease(val: { i: Input, e: EV }) {
    this.dispatch(onInputMouseRelease(val));
  }
  public onNodeMouseDown(val: { node: DataflowNode, e: EV }) {
    this.dispatch(onNodeMouseDown(val));
  }
  public onMouseRelease(val: { e: EV }) {
    this.dispatch(onMouseRelease(val));
  }
  public onMouseMove(val: { e: EV }) {
    this.dispatch(onMouseMove(val));
  }
  public onDFEMouseDown(val: { e: EV }) {
    this.dispatch(onDFEMouseDown(val));
  }
  public setNode(val: { node: DataflowNode }) {
    this.dispatch(setNode.started(val));
  }

  public setDataflow(val: { dataflow: DataflowState }) {
    this.dispatch(setDataflow.started(val));
  }

  public removeNode(val: { node: MyAudioNode }) {
    this.dispatch(removeNode.started(val));
  }

  public connect(val: { input: Input, output: Output }) {
    this.dispatch(connect.started(val));
  }

  public disconnect(val: { edge: Edge }) {
    this.dispatch(disconnect.started(val));
  }
}
