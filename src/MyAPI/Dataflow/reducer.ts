import * as A from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';
import { DataflowState, initialDF, DataflowEditorDragState } from './data';
import { Translate, MxM } from './MyLenearAlgebra';
import { DataflowNode, NodeSelectState } from './api';

// import { Koyomi, initialState, PlayState } from './Koyomi';
//reducer
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState

export const audioReducer = (state: DataflowState = initialDF, action: Action): DataflowState => {
  // console.log(action.type);
  if (isType(action, A.onOutputMouseDown)) {
    return ({
      ...state,
      drag: {
        ...state.drag,
        connecting: {
          ...state.drag.connecting,
          out: action.payload.o,
        },
        dfeState: DataflowEditorDragState.drawingEdge,
      },
    });
  }
  if (isType(action, A.onInputMouseRelease)) {

    return ({
      ...state,
      drag: {
        ...state.drag,
        dfeState: DataflowEditorDragState.idle,
      },
    });
  }
  if (isType(action, A.onMouseRelease)) {

    return ({
      ...state,
      drag: {
        ...state.drag,
        dfeState: DataflowEditorDragState.idle,
      },
    });
  }
  if (isType(action, A.onNodeMouseDown)) {
    if (action.payload.e.getModifierState('Shift')) {
      return ({
        ...state,
        nodes: state.nodes.map((n: DataflowNode) => {
          if (n.id == action.payload.node.id) {
            return ({
              ...n,
              selectedState: NodeSelectState.Selected,
            }) as DataflowNode;
          } else { return n; }
        }),
        drag: {
          ...state.drag,
          dfeState: DataflowEditorDragState.movingNodes,
        }
      });
    } else {
      return ({
        ...state,
        nodes: state.nodes.map((n: DataflowNode) => {
          if (n.id == action.payload.node.id) {
            return ({
              ...n,
              selectedState: NodeSelectState.Selected,
            }) as DataflowNode;
          } else {
            return ({
              ...n,
              selectedState: NodeSelectState.Idle,
            }) as DataflowNode;
          }
        }),
        drag: {
          ...state.drag,
          dfeState: DataflowEditorDragState.movingNodes,
        }

      });
    }
  }
  if (isType(action, A.onDFEMouseDown)) {
    console.log(action);
    let nodes = state.nodes;
    if (!action.payload.e.getModifierState('Shift')) {
      nodes = state.nodes.map((n: DataflowNode) => {
        return ({
          ...n,
          selectedState: NodeSelectState.Idle,
        }) as DataflowNode;
      });
    }
    return ({
      ...state,
      nodes: nodes,
      drag: {
        ...state.drag,
        dfeState: DataflowEditorDragState.panning,
      }

    });
  }
  if (isType(action, A.onMouseMove)) {
    console.log(action);

    let e = action.payload.e;
    let shiftX = e.screenX - state.drag.screenX;
    let shiftY = e.screenY - state.drag.screenY;

    let res = {
      ...state,
      drag: {
        ...state.drag,
        screenX: e.screenX,
        screenY: e.screenY,
        clientX: e.clientX,
        clientY: e.clientY,
        posX: e.screenX,
        posY: e.screenY,
      }
    };
    if (state.drag.dfeState == DataflowEditorDragState.panning) {
      res = {
        ...res,
        procsMat: MxM(res.procsMat, Translate(shiftX, shiftY)),
      };
    }
    if (state.drag.dfeState == DataflowEditorDragState.movingNodes) {
      res = {
        ...res,
        nodes: res.nodes.map((v: DataflowNode) => {
          if (v.selectedState == NodeSelectState.Selected) {
            return {
              ...v,
              matrix: MxM(v.matrix, Translate(shiftX, shiftY)),
            } as DataflowNode;
          } else { return v; }
        }),
      };
    }
    return (res);

  }
  if (isType(action, A.addNode.done)) {
    return action.payload.result.dataflow;
  }
  if (isType(action, A.addNode.done)) {
    return action.payload.result.dataflow;
  }
  if (isType(action, A.setNode.done)) {
    return action.payload.result.dataflow;
  }
  if (isType(action, A.setDataflow.done)) {
    return action.payload.result.dataflow;
  }

  if (isType(action, A.removeNode.done)) {
    return action.payload.result.dataflow;
  }

  if (isType(action, A.connect.done)) {
    return action.payload.result.dataflow;
  }

  if (isType(action, A.disconnect.done)) {
    return action.payload.result.dataflow;
  }
  return state;

};
