import { ident, extend, MySVGMatrix, Translate } from './MyLenearAlgebra';
import { DataflowState, initialDF, outputs } from './data';
export type DataflowNode = MyAudioNode & MyUINode;
export enum NodePlace {
  Inputs,
  Procs,
  OutPuts,
}
export enum NodeSelectState {
  Selected,
  Idle,
}
export type MyUINode = {
  matrix: MySVGMatrix,
  place: NodePlace,
  selectedState: NodeSelectState,
};

export class Dataflow {
  id: number;
  iden() { return this.id++; }

  masterOut: MyGainNode;
  state: DataflowState;
  context: AudioContext;

  private add(node: MyAudioNode, place: NodePlace = NodePlace.Procs) {
    let ui: MyUINode = { matrix: ident, place: place, selectedState: NodeSelectState.Idle };
    let n = extend(node, ui);
    this.state.nodes.push(n);
    n.inputs.map((value: Input) => { return value.id = this.iden(); });
    n.outputs.map((value: Output) => { return value.id = this.iden(); });

  }
  constructor(testnum: number, audioContext = new AudioContext) {
    this.id = 0;
    this.context = audioContext;
    this.state = initialDF;

    // let availableTypes = [MyAudioNode, MyGainNode, MasterOut];

    let mo = new MasterOut(this.iden(), this.context);
    this.add(mo, NodePlace.OutPuts);

    this.masterOut = mo;
    this.state.testnum = testnum;
    let ac = this.context;
    let out = ac.destination;

    let clk = new MasterClock(this.iden(), this.context);
    //this.masterOut.content.connect(out);
    //osc.outputs[0].content.connect(this.masterOut.content);
    // this.masterOut.inputs[1].content.value = 0.5;
    // this.addNode('Gain');
    let ga = new MyGainNode(this.iden(), this.context);
    let osc = new Osc(this.iden(), this.context);
    this.add(ga, NodePlace.Procs);
    this.add(osc, NodePlace.Procs);
    this.add(clk, NodePlace.Inputs);
    this.connect(mo.inputs[0], ga.outputs[0]);
    this.connect(ga.inputs[0], clk.outputs[0]);
    //    osc.start();addtoIn

  }
  isNodeEq(a: MyAudioNode, b: MyAudioNode) {
    return a.id == b.id;
  }
  removeNode(node: MyAudioNode) {

    this.state.nodes = this.state.nodes.filter((value: MyAudioNode) => !this.isNodeEq(value, node));

  }

  addNode(nodetype: string) {
    if (nodetype === 'Gain') {
      let n = new MyGainNode(this.iden(), this.context);
      this.add(n);
    }
  }
  findNode(id: number) {
    return outputs(this.state).findIndex((value: DataflowNode) => value.id === id);
  }
  setNode(node: DataflowNode) {
    let prevP = this.state.nodes.findIndex((value: DataflowNode) => value.id === node.id);
    this.state.nodes[prevP] = node;
  }
  setDataflow(df: DataflowState) {

    this.state = df;
  }
  connect(input: Input, output: Output) {
    let a = input.content;
    if (<AudioParam>(a)) {
      output.content.connect(<AudioParam>a);
    } else {
      output.content.connect(<AudioNode>a);
    }
    let e = new Edge();
    // TODO better way
    e.input = input;
    e.output = output;
    e.sym = Symbol();
    e.id = this.iden();
    this.state.edges.push(e);
  }
  disconnect(e: Edge) {
    let a = e.input.content;
    if (<AudioParam>(a)) {
      e.output.content.disconnect(<AudioParam>a);
    } else {
      e.output.content.disconnect(<AudioNode>a);
    }
    // e.output.content.disconnect(e.input.content);
    let index = this.state.edges.indexOf(e, 0);
    if (index > -1) {
      this.state.edges.splice(index, 1);
    }
  }

}
export class Edge {
  input: Input;
  output: Output;
  sym: Symbol;
  id: number;
}

export class MyAudioNode {
  name: string;
  content: AudioNode;
  inputs: Input[];
  outputs: Output[];
  sym: Symbol;
  id: number;

  constructor(id: number) {
    this.inputs = new Array<Input>();
    this.outputs = new Array<Output>();
    this.sym = Symbol();
    this.id = id;
  }
  clacMat() {
    this.inputs.map((value: Input, index: number, array: Input[]) => {
      let y = index * 10;
      value.matrix = Translate(0, y);
    });
    this.outputs.map((value: Output, index: number, array: Output[]) => {
      let y = index * 10;
      value.matrix = Translate(100, y);
    });
  }

}
export class Input {
  name: string;
  content: AudioParam | AudioNode;
  public matrix: MySVGMatrix;

  parentnode: MyAudioNode;
  id: number;
  set(val: number) {
    let a = this.content;
    if (<AudioParam>(a)) {
      (<AudioParam>a).setValueAtTime(val, 0);
      // e.output.content.disconnect(<AudioParam>a.);
    } else {
      // e.output.content.disconnect(<AudioNode>a);
    }

  }
}

export class Output {
  name: string;
  content: AudioNode;
  parentnode: MyAudioNode;
  public matrix: MySVGMatrix;
  id: number;
}
export class MyGainNode extends MyAudioNode {
  name = 'Gain';
  constructor(id: number, c: AudioContext) {
    super(id);
    let an = c.createGain();
    this.content = an;
    let i = new Input();
    i.name = 'in';
    i.content = an;
    i.parentnode = this;
    this.inputs.push(i);
    let i2 = new Input();
    i2.name = 'gain';
    i2.content = an.gain;
    i2.parentnode = this;
    this.inputs.push(i2);
    let o = new Output();
    o.name = 'out';
    o.content = an;
    o.parentnode = this;
    this.outputs.push(o);
  }
}
export class Osc extends MyAudioNode {
  name = 'Osc';
  constructor(id: number, c: AudioContext) {
    super(id);
    let an = c.createOscillator();
    this.content = an;
    let i = new Input();
    i.name = 'in';
    i.content = an;
    i.parentnode = this;
    this.inputs.push(i);
    let i2 = new Input();
    i2.name = 'freq';
    i2.content = an.frequency;
    i2.parentnode = this;
    this.inputs.push(i2);
    let o = new Output();
    o.name = 'out';
    o.content = an;
    o.parentnode = this;
    this.outputs.push(o);
  }
}
export class MasterClock extends Osc {
  name = 'MasterClock';
  constructor(id: number, c: AudioContext) {
    super(id, c);
    this.inputs[1].set(0.5);
    //this.outputs[0].content.connect(c.destination);
  }
}
export class MasterOut extends MyGainNode {
  name = 'MasterOut';
  constructor(id: number, c: AudioContext) {
    super(id, c);
    this.outputs[0].content.connect(c.destination);
  }
}
