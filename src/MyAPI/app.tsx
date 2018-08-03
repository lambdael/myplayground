import * as React from 'react';

import *  as Koyomi from './Timer/Koyomi';
import { LineChart } from './D3/LineChart';
import Scene from './nor/Scene';
//import { Props, StoreState } from './types/index';

// import { Master } from './Master/Master';
// import { Audio } from './Audio/Audio';
// import Editor from './Editor/Editor';
const data = [[1, 0], [2, 3], [3, 2], [6, 3], [7, 2]] as [number, number][];

import * as fs from 'fs';
import * as path from 'path';
const fragUrl = path.join(__dirname, '/default/fragment.frag');
import { Provider } from 'react-redux';
// simport store from './store';
import Container from './Container';
import { saga, store } from './store';

// import { createStore, applyMiddleware } from 'redux';

// ...
import rootSaga from './sagas';
import { myS } from './Dataflow/Settings';

// const action = type => store.dispatch({ type });

export class App extends React.Component<{}, {}> {
  _audioContext: AudioContext;
  koyomi: Koyomi.Koyomi;
  timerID: NodeJS.Timer;
  constructor(p: any) {
    super(p);
    this._audioContext = new AudioContext();

    // let t = this._audioContext.currentTime;

    //this.state = p.state;
  }
  // tslint:disable-next-line:no-empty

  componentDidMount() {

    // this.setState(this.init());

    // this.timerID = setInterval(
    //   () => this.tick(),
    //   25
    // );
    // this.node.start();
    saga.run(rootSaga, this._audioContext);

  }
  componentWillUnmount() {
    // clearInterval(this.timerID);
  }

  toS(s: any, depth: number = 3) {
    let result = 'ERROR' as string;
    if (s) {
      result = s.toString();
      if (s.koyomi) {
        result = s.koyomi.currentTime.toString();
      }
    }

    return result;
  }

  render() {
    //this.amp.gain.value = Koyomi.saw(this.state.koyomi, 8) + 0.1;
    // let s = this.toS(store);
    //let k = s.koyomi;
    // let m = s.mon;
    let t = new Date().getTime();
    // let h = m.hide;
    let a = 100;
    // let bufferLength = this.analyser.frequencyBinCount;
    //  let dataArray = new Uint8Array(bufferLength);

    // let asas = this.analyser.getByteTimeDomainData(dataArray);

    return (
      <div style={{
        fontSize: myS.fontSize,
        fontFamily: 'Times, Verdana, Tahoma, Segoe UI, Geneva, sans-serif', float: 'none',
        //  lineHeight: '1.5',
        margin: ' 0 auto',
      }} >

        {/* {dataArray} */}
        <Provider store={store}>
          <Container />
        </Provider>
        {/* <LineChart data={data} /> */}
      </div >

    );
  }

}
