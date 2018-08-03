// ActionCreator
// import { Action } from 'redux';
import * as A from 'redux';

import { Action, actionCreatorFactory, AnyAction, AsyncActionCreators, ActionCreatorFactory } from 'typescript-fsa';

export const timerActionCreator = actionCreatorFactory('TIMER');

export const incBPM =
  timerActionCreator<{ n: number }>('incBPM');
export const decBPM =
  timerActionCreator<{ n: number }>('decBPM');
export const setBPM =
  timerActionCreator<{ n: number }>('setBPM');
export const setTime =
  timerActionCreator<{ n: number }>('setTime');
export const start =
  timerActionCreator<{ n: number }>('start');
export const stop =
  timerActionCreator<{ n: number }>('stop');
export const pause =
  timerActionCreator<{ n: number }>('pause');
export const resume =
  timerActionCreator<{ n: number }>('resume');
export const asy =
  timerActionCreator.async<{ n: number },
    { n: number }
    >('asy');

export class TimerActionDispatcher {
  constructor(private dispatch: (action: A.Action) => void) {
    console.log(dispatch.name);

  }
  public incBPM(amount: number) {
    this.dispatch(incBPM({ n: amount }));
  }

  public decBPM(amount: number) {
    this.dispatch(decBPM({ n: amount }));
  }
  public setBPM(amount: number) {
    this.dispatch(setBPM({ n: amount }));
  }
  // public async(amount: number) {
  //   this.dispatch(A.asy({ n: amount }));
  // }

  public setTime(amount: number) {
    this.dispatch(setTime({ n: amount }));
  }
  public start(amount: number) {
    this.dispatch(start({ n: amount }));
  }
  public stop(amount: number) {
    this.dispatch(stop({ n: amount }));
  }
  public pause(amount: number) {
    this.dispatch(pause({ n: amount }));
  }
  public resume(amount: number) {
    this.dispatch(resume({ n: amount }));
  }

}