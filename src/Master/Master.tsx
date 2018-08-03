import * as React from 'react';
import * as K from '../Timer/Koyomi';
import { Props } from '../Timer/reducer';
import { ActionDispatcher } from '../Timer/Container';


export class Master extends React.Component<Props, {}> {

  to255(f: number) {
    return Math.floor(f * 255);
  }
  render() {
    let p = this.props.value;
    let k = p.koyomi;
    let time = K.time(k) * 0.001;
    let bpm = k.BPM;

    let c4 = K.saw(k, 4);
    let mod4 = K.colorBW(c4);
    let c8 = K.saw(k, 8);
    let mod8 = K.colorBW(c8);
    let c16 = this.to255(K.saw(k, 4) * K.saw(k, 16));
    let mod16 = K.colorBW(c16);
    let d = p.mon.dir;
    let f = p.mon.file;

    return (

      <div>
        <div>
          {p.num}
          <button onClick={() => this.props.actions.increment(1)}>+</button>
          <button onClick={() => this.props.actions.decrement(1)}>-</button>

          <span style={{ backgroundColor: mod4 }}>
            {d}
          </span>
        </div>
        <div>
          <span style={{ backgroundColor: mod4 }}>
            {f}
          </span>
        </div>
        <div>
          <span>
            c4: {c4}
          </span>
          <span>
            Time: {time}
          </span>
          <span>
            BPM:
            {bpm}
          </span>
        </div>
        <div>

          <span style={{ backgroundColor: 'rgba(52, 10, 52, {to255(c4)})' }}>
            c4 {c4} {K.saw(k, 4)}
          </span>
          <span style={{ backgroundColor: 'rgba(52, 10, 52, {to255(c8)})' }}>
            c8 {c8}
          </span>
          <span style={{ backgroundColor: 'rgba({c16}, 100, 100, 255' }}>
            c16 {c16}
          </span>
        </div>
        <div>
          <span style={{ backgroundColor: 'rgba(100, 100, 52, 255' }}>
            TEST STRING
          </span>
        </div >
      </div >
    );
  }
}

export default Master;