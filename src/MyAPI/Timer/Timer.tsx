import * as React from 'react';
import { MyProps } from '../Container';
import * as K from './Koyomi';

function toInt(ss: number, rad: number = 10) {
  return Math.floor(ss * 255).toString(rad);
}
export function Timer(props: MyProps) {
  let p = props;
  let t = p.timer;
  let a = p.timerActions;
  if (p.timer) {
    let lsls = K.time(t);
    let ss = K.saw(t, 4);
    let bs = K.ramp(t, 1);
    let p4 = K.beatpos(t, 4);
    let p8 = K.beatpos(t, 8);
    let p16 = K.sixteenpos(t);
    let b = K.barpos(t);
    let cc = toInt(ss, 16);
    let rgbaF = [0.8, 0.5, 0.9, 1.0];

    let c = rgbaF.map((value: number, index: number, array: number[]) => { return toInt(value * ss); });

    let sss = 'rgba(' + c[0] + ',' + c[1] + ', ' + c[2] + ', 255) ';
    return (

      <span style={{ backgroundColor: sss, fontSize: 60, }}>
        bpm: {t.BPM}
        {/* <button onClick={() => this.props.actions.async(1)}>
            Increment after 1 second
    </button> */}
        <button onClick={() => a.incBPM(1)}>+</button>
        <button onClick={() => a.decBPM(1)}>-</button>
        <button onClick={() => a.start(1)}>start</button>
        <button onClick={() => a.stop(1)}>stop</button>
        <button onClick={() => a.pause(1)}>pause</button>
        <button onClick={() => a.resume(1)}>resume</button>

        <span>{b}</span>:
        <span>{p4}</span>:
        <span>{p16}</span>
      </span>

    );
  } else {
    return <div>ss??ss
            <button onClick={() => a.incBPM(1)}>+</button>

      {props.toString()}
    </div >;

  }
}
