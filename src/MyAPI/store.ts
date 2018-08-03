import { timerReducer } from './Timer/reducer';
import { createStore, combineReducers, Action, AnyAction, Store } from 'redux';
import { Koyomi } from './Timer/Koyomi';
import { applyMiddleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { Dataflow, } from './Dataflow/api';
import { DataflowState } from './Dataflow/data';
import { audioReducer } from './Dataflow/reducer';

export const saga = createSagaMiddleware();
export const timer = timerReducer;
export const dataflow = audioReducer;
export const store = createStore(
  combineReducers({
    timer,
    dataflow,
  })
  ,
  applyMiddleware(saga)
);
export type ReduxState = { timer: Koyomi, dataflow: DataflowState };

// export type ReduxAction = MyActions | Action;
