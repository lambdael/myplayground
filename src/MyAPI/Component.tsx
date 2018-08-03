import * as React from 'react';
import { MyProps } from './Container';
import * as K from './Timer/Koyomi';
import { Pi } from './Timer/Pi';
import { Timer } from './Timer/Timer';
import { DataflowView } from './Dataflow/DataflowEditor';
import { MyGainNode, MyAudioNode, Dataflow } from './Dataflow/api';
import { DataflowD3 } from './D3/Dataflow';

function toInt(ss: number, rad: number = 10) {
  return Math.floor(ss * 255).toString(rad);
}

export class Main extends React.Component<MyProps, {}> {
  audioContext: AudioContext;
  masterGain: MyAudioNode;
  constructor(props: MyProps) {
    super(props);
  }
  render() {
    if (this.props.timer) {
      let lsls = K.time(this.props.timer);
      let ss = K.saw(this.props.timer, 4);
      let bs = K.ramp(this.props.timer, 1);
      let rgbaF = [0.3, 0.2, 0.5, 0.5];

      let c = rgbaF.map((value: number, index: number, array: number[]) => { return toInt(value * ss); });

      let sss = 'rgba(' + c[0] + ',' + c[1] + ', ' + c[2] + ', 255) ';
      return (

        <span >

          <DataflowView  {...this.props} />
          <Pi radian={bs} />
          <Pi radian={ss} />

          <div>
            {/* <DataflowD3  {...this.props} ></DataflowD3> */}
            {/* <Nodeview node={this.node} /> */}
            <Timer {...this.props} />
          </div>
        </span >
      );
    } else {
      return <div>ss??ss
            <button onClick={() => this.props.timerActions.incBPM(1)}>+</button>

        {this.props.toString()}
      </div >;

    }
  }
}
