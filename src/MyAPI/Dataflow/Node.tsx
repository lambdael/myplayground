import * as React from 'react';
import { MyProps } from '../Container';
import * as A from './actions';
import { MyAudioNode, Input, Output, Edge, DataflowNode, NodeSelectState } from './api';
import { point, Translate, PxM, toSVGString, ident, } from './MyLenearAlgebra';
import { Transform } from 'stream';
import { myS, rectStyle, UIRectStyle, nonselectableText, selected } from './Settings';
import { CSSProperties } from 'react';
import { DataflowEditorDragState } from './data';
export class InputView extends React.Component<{ myp: MyProps, input: Input }> {
  textRef: any;

  render() {
    let d = this.props.myp.dfActions;
    let p = this.props.myp;

    let n = this.props.input;
    let c = n.content;
    // let p = calcInputPortPointInList(input);
    let sss = '';
    if (typeof c === typeof AudioNode) {
      { sss = (c as AudioNode).toString(); }
    } else if (typeof c === typeof AudioParam) {
      { sss = (c as AudioParam).toString(); }
    }

    let label = <Label myp={p} text={n.name} style={nonselectableText} bgstyle={rectStyle} ref={(r) => { this.textRef = r; }} />;

    let h = 10;
    let w = 100 / 2;
    if (this.textRef) {
      h = this.textRef.bbox.h;
      w = this.textRef.bbox.w;
    }
    let release = (event: React.MouseEvent<SVGCircleElement>) => d.onMouseRelease({ e: event });
    let o = p.dataflow.drag.connecting.out;
    if (p.dataflow.drag.dfeState == DataflowEditorDragState.drawingEdge
    ) {
      if (o) {
        let oo = o;
        release = (event: React.MouseEvent<SVGCircleElement>) => d.connect({ input: n, output: oo });
      }
    }

    return (
      <g>
        <circle cx={- h / 2} cy={- h / 2} r={h / 2}
          onMouseUp={release}
          onMouseMove={(event) => d.onMouseMove({ e: event })}
        //  onMouseUp={(event) => d.onMouseRelease({ e: event })}
        />

        {label}

      </g>
    );
  }
}
export interface LabelProps {
  myp: MyProps;
  text: String;
  style: CSSProperties;
  bgstyle: CSSProperties;
}

export class Label extends React.Component<LabelProps, {}> {
  textRef: any;
  public bbox: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  updateBBox() {
    if (this.textRef) {

      let bb = this.textRef.getBBox();
      this.bbox = {
        x: bb.x,
        y: bb.y,
        w: bb.width,
        h: bb.height,
      };
      // Trigger re-rendering
      this.setState({
        // bbox: this.findD().getBBox()
      });
    }
  }
  componentDidMount() {
    // Will trigger a re-rendering at mount
    this.updateBBox();
  }

  componentDidUpdate(prevProps: LabelProps) {
    // If content has changed, re-render
    if (this.props.text !== prevProps.text) {
      this.updateBBox();
    }
  }
  constructor(props: LabelProps) {
    super(props);
    this.bbox = { x: 0, y: 0, w: 0, h: 0, };
    //this.inputRef = React.createRef();
  }

  render() {
    return (
      <g>
        <rect x={this.bbox.x} y={this.bbox.y} width={this.bbox.w} height={this.bbox.h} style={this.props.bgstyle} />
        <text ref={(r) => { this.textRef = r; }} style={this.props.style}> {this.props.text}{this.bbox.h}
        </text>
      </g>
    );
  }

}
export class OutputView extends React.Component<{ myp: MyProps, output: Output }> {
  textRef: any;
  render() {
    let d = this.props.myp.dfActions;
    let p = this.props.myp;
    let n = this.props.output;

    let label = <Label myp={p} text={n.name} style={nonselectableText} bgstyle={rectStyle} ref={(r) => { this.textRef = r; }} />;

    let h = 10;
    let w = 100 / 2;
    if (this.textRef) {
      h = this.textRef.bbox.h;
      w = this.textRef.bbox.w;
    }
    let release = (event: React.MouseEvent<SVGCircleElement>) => d.onMouseRelease({ e: event });
    let i = p.dataflow.drag.connecting.in;
    if (p.dataflow.drag.dfeState == DataflowEditorDragState.drawingEdge
    ) {
      if (i) {
        let ii = i;
        release = (event: React.MouseEvent<SVGCircleElement>) => d.connect({ input: ii, output: n });
      }
    }
    return (
      <g >
        {label}
        <circle cx={10 + w} cy={-h / 2} r={h / 2}
          onMouseDown={(event) => d.onOutputMouseDown({ o: n, e: event })}
          onMouseMove={(event) => d.onMouseMove({ e: event })}
          onMouseUp={release}
        />
      </g >
    );
  }
}

export class NodeView extends React.Component<{ myp: MyProps, node: DataflowNode }> {
  textRef: any;
  render() {
    let p = this.props.myp;
    let d = this.props.myp.dfActions;
    let n = this.props.node;
    let height = myS.labelHight;
    let width = myS.nodeRatio.x * myS.screenUnit;

    if (this.textRef) {
      height = this.textRef.bbox.h;
    }

    let inputs = n.inputs.map((i: Input, index: number) => {
      let item = <InputView myp={p} input={i}></InputView>;
      let y = ((index + 1) * height);

      return (
        <g key={i.id} transform={toSVGString(Translate(0, y))}  >
          {item}
        </g>);
    }
    );
    let outputs = n.outputs.map((o: Output, index: number) => {
      let item = <OutputView myp={p} output={o}></OutputView>;
      let thi = document.getElementById('mysvg');

      let y = ((index + 1) * height);
      return (
        <g key={o.id} transform={toSVGString(Translate(width / 2, y))}>
          {item}
        </g >);

    }
    );
    let id = n.id;
    let nodeW = myS.nodeRatio.x * myS.screenUnit;
    let nodeH = myS.nodeRatio.y * myS.screenUnit;
    let style = rectStyle;
    if (n.selectedState == NodeSelectState.Selected) {
      style = selected;
    }
    return (

      <g transform={toSVGString(n.matrix)}

      // pointerEvents='none'
      >
        <rect width={nodeW} height={nodeH} style={style}
          onMouseDown={(event) => d.onNodeMouseDown({ node: n, e: event })}
          onMouseMove={(event) => d.onMouseMove({ e: event })}
          onMouseUp={(event) => d.onMouseRelease({ e: event })}
        />
        <Label myp={p} text={n.name} style={nonselectableText} bgstyle={rectStyle} ref={(r) => { this.textRef = r; }} />

        {inputs}
        {outputs}
        {/* <rect width={nodeW} height={nodeH} style={UIRectStyle} /> */}
      </g >
    );
  }
}
