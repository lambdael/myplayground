import * as React from 'react';
import { Props, StoreState } from '../types/index';
import * as K from '../types/Koyomi';
import { render } from 'react-dom';
// import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

export class Editor extends React.Component<Props, StoreState> {
  // tslint:disable-next-line:typedef
  constructor(p: StoreState) {
    super(p);
    // this.state = { k: { BPM: p.k.BPM, startTime: p.k.startTime, currentTime: new Date() } };
    this.onChange = this.onChange.bind(this);

  }
  // This binding is necessary to make `this` work in the callback
  onChange(value: string, event?: any) {
    console.log('change', value);
    // let s = newValue.toString();
    this.props.handleChangeFrag(value, event);

  }

  render() {
    let k = this.props.Koyomi;
    let code = this.props.frag;
    let time = K.time(k);
    let bpm = k.BPM;

    let c4 = K.saw(k, 4);
    let mod4 = K.colorBW(c4);
    let c8 = K.saw(k, 8);
    let mod8 = K.colorBW(c8);
    let c16 = K.saw(k, 16);
    let mod16 = K.colorBW(c16);
    return (
      <AceEditor
        mode='java'
        theme='github'
        onChange={(value: string, event?: any) => this.onChange(value, event)}
        name='UNIQUE_ID_OF_DIV'
        editorProps={{ $blockScrolling: true }}
        value={code}
      />
    );
  }
}

export default Editor;