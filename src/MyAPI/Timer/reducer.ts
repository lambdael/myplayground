import * as A from './actions';
import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { Koyomi, initialState, PlayState } from './Koyomi';
//reducer

export const timerReducer = (prevState: Koyomi = initialState, action: Action): Koyomi => {

  if (isType(action, A.incBPM)) {
    return { ...prevState, BPM: prevState.BPM + action.payload.n };
  }
  if (isType(action, A.decBPM)) {
    return { ...prevState, BPM: prevState.BPM - action.payload.n };
  }
  if (isType(action, A.setBPM)) {
    return { ...prevState, BPM: action.payload.n };
  }
  if (isType(action, A.setTime)) {
    let pt = prevState.playngTime;
    if (prevState.state == PlayState.playing) {
      pt = action.payload.n - prevState.startTime;
    }
    return { ...prevState, currentTime: action.payload.n, playngTime: pt };
  }
  if (isType(action, A.start)) {
    return { ...prevState, startTime: prevState.currentTime, playngTime: 0, state: PlayState.playing };
  }
  if (isType(action, A.stop)) {
    return { ...prevState, playngTime: 0, state: PlayState.pause };
  }
  if (isType(action, A.pause)) {
    return { ...prevState, state: PlayState.pause };
  }
  if (isType(action, A.resume)) {
    let st = prevState.currentTime - prevState.playngTime;
    return { ...prevState, startTime: st, state: PlayState.playing };
  }
  return prevState;

};
