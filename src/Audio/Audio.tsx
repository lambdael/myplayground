import * as React from 'react';
import { Props, StoreState } from '../types/index';
import * as K from '../types/Koyomi';
// import * as a from '../App';

export class Audio extends React.Component<Props, StoreState> {
  onStart(arg0: React.FormEvent<HTMLButtonElement>) {
    // this.props.mon.startPlay();
  }
  onStop(arg0: React.FormEvent<HTMLButtonElement>) {
    //this.props.mon.startPlay();
  }
  // tslint:disable-next-line:typedef
  constructor(p: StoreState) {
    super(p);
    // this.state = { k: { BPM: p.k.BPM, startTime: p.k.startTime, currentTime: new Date() } };
  }
  to255(f: number) {
    return Math.floor(f * 255);
  }

  onChangeVol(event: React.FormEvent<HTMLInputElement>) {
    let input = event.currentTarget;
    if (0 < input.value.length) {
      let f = parseInt(input.value);
      this.props.mon.setBPM(f);
      this.state.mon.setBPM(f);
    }
  }

  render() {
    let k = this.props.koyomi;
    let time = K.time(k);
    let bpm = k.BPM;

    let c4 = K.saw(k, 4);
    let mod4 = K.colorBW(c4);
    let c8 = K.saw(k, 8);
    let mod8 = K.colorBW(c8);
    let c16 = this.to255(K.saw(k, 4) * K.saw(k, 16));
    let mod16 = K.colorBW(c16);
    let d = this.props.mon.dir;
    let f = this.props.mon.file;
    // let da = this.props.mon.abuffer.buffer;

    return (
      <div>
        <div>
          <span style={{ textAlign: 'center' }}>
            sss
          </span>
        </div>

        <div style={{ backgroundColor: mod8, textAlign: 'center' }}>
          {/* <input onChange={(event: React.FormEvent<HTMLInputElement>) => this.onChange(event)} id='audioFile' type='file' accept='audio/*' /> */}
          <input onChange={(event: React.FormEvent<HTMLInputElement>) => this.onChangeVol(event)} type='text' value={bpm} />
          {/* <button onClick={(event: React.FormEvent<HTMLButtonElement>) => this.onStart(event)} id='startbutton'>start</button> */}
          {/* <button onClick={(event: React.FormEvent<HTMLButtonElement>) => this.onStop(event)} >stop</button> */}
        </div>
      </div >
    );
  }
}

export default Audio;