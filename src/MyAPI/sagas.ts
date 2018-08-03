import { delay } from 'redux-saga';

import { ForkEffect, PutEffect, GenericAllEffect, ActionChannelEffect, CallEffect, TakeEffect, } from 'redux-saga/effects';
import * as A from 'redux';

import { put, takeEvery, take, all, actionChannel, call } from 'redux-saga/effects';
import * as timer from './Timer/actions';
// import { Action } from 'redux';
import { Action, AnyAction, isType } from 'typescript-fsa';
import { App } from './app';
import { Dataflow, Input, MyAudioNode, Output, Edge } from './Dataflow/api';
import { addNode, connect, DFActions, dataflowActionCreator, removeNode, disconnect, dfpattern, setNode, setDataflow } from './Dataflow/actions';

// ...
// Our worker Saga: will perform the async increment task
export function* incrementAsync(payload: number) {
  yield delay(1000);
  yield put({ type: 'incBPM', payload: 10 });
}
// 1- Create a channel for request actions
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  //let action = yield takeEvery(ActionNames.ASY, incrementAsync);

  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('asy');
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(requestChan);
    // 3- Note that we're using a blocking call
    yield call(incrementAsync, payload);
  }
}

export function* audio(ac: AudioContext) {
  //let action = yield takeEvery(ActionNames.ASY, incrementAsync);
  let df = yield new Dataflow(34, ac);
  // df.state.testnum = 34;
  // 1- Create a channel for request actions
  // const requestChan = yield actionChannel(addNode.started);
  yield put({ type: addNode.done.type, payload: { result: { dataflow: df.state } } });
  while (true) {
    // 2- take from the channel
    const requestChan = yield actionChannel('Dataflow/');
    // const as = yield take(addNode.started);
    // 3- Note that we're using a blocking call
    // console.log('sss');

    const t = yield take([
      addNode.started,
      setNode.started,
      setDataflow.started,
      removeNode.started,
      disconnect.started,
      connect.started,
    ]);

    if (isType(t, addNode.started)) {
      // let ac = t.action as Action<{ nodetype: string }>;
      //  yield call(df.addNode, t.payload.nodeType);
      df.addNode(t.payload.nodeType);
      yield put({ type: addNode.done.type, payload: { result: { dataflow: df.state } } });
    }
    if (isType(t, removeNode.started)) {
      // yield call(df.removeNode, ac.payload.node);
      //yield put({ type: removeNode.done.type, result: { dataflow: df } });
      df.removeNode(t.payload.node);
      yield put({ type: removeNode.done.type, payload: { result: { dataflow: df.state } } });

    }
    if (isType(t, connect.started)) {
      console.log(t);

      let ac = t as Action<{
        input: Input;
        output: Output;
      }>;
      df.connect(t.payload.input, t.payload.output);
      yield put({ type: connect.done.type, payload: { result: { dataflow: df.state } } });
      // yield call(df.connect, ac.payload.input, ac.payload.output);
      //yield put({ type: connect.done.type, result: { dataflow: df } });
    }
    if (isType(t, disconnect.started)) {
      let ac = t as Action<{
        edge: Edge;
      }>;
      //t.action.payload.dataflow;
      // yield call(df.disconnect, ac.payload.e);
      //yield put({ type: disconnect.done.type, result: { dataflow: df } });
      df.disconnect(t.payload.edge);
      yield put({ type: disconnect.done.type, payload: { result: { dataflow: df.state } } });
    }
  }

}

export function* callTimer() {
  //let action = yield takeEvery(ActionNames.ASY, incrementAsync);

  // 1- Create a channel for request actions
  // const requestChan = yield actionChannel(ActionNames.TIM);
  while (true) {
    yield delay(33);
    let t = new Date().getTime() / 1000.0;
    // app.tick(t);

    yield put({ type: timer.setTime.type, payload: { n: t } });
  }

}
export function* helloSaga() {
  console.log('Hello Sagas!');
  return 1.0;
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga(ac: AudioContext) {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    callTimer(),
    audio(ac),
  ]);
}