import { Main } from './Component';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import * as timerA from './Timer/actions';
import { Koyomi } from './Timer/Koyomi';
import { ReduxState } from './store';
import * as React from 'react';
import { Dataflow } from './Dataflow/api';
import { TimerActionDispatcher } from './Timer/actions';
import { DFActionDispatcher } from './Dataflow/actions';
import { DataflowState } from './Dataflow/data';

export interface MyProps {
  timer: Koyomi;
  dataflow: DataflowState;
  timerActions: TimerActionDispatcher;
  dfActions: DFActionDispatcher;
}
export default connect(
  (state: ReduxState) => ({
    timer: state.timer,
    dataflow: state.dataflow
  }),
  (dispatch: Dispatch<Action>) => ({
    timerActions: new TimerActionDispatcher(dispatch),
    dfActions: new DFActionDispatcher(dispatch)
  })
)(Main);
