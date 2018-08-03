import * as React from 'react';
import * as THREE from 'three';

import * as K from '../Timer/Koyomi';
import { } from '../Timer/reducer';

export default class Scene extends React.Component<Props, {}> {

  fragmentShader: string;
  toScreen: any;
  renderPass: any;
  // TODO layout size
  private mount: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private material: THREE.ShaderMaterial;

  private mesh: THREE.Mesh;
  frameId: number;

  constructor(props: Props) {
    super(props);
    console.log(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.fragmentShader = props.value.mon.frag;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const geometry = new THREE.PlaneGeometry(2, 2);

    let ParamsShaderMaterial = {
      uniforms: {
        'time': { value: 1.0 },
        'uTex': { type: 't', value: new THREE.TextureLoader().load(props.value.mon.texture) },
      }, // regular texture

      vertexShader: [
        'varying vec2 vUv;',
        'precision mediump float;',
        'attribute vec4 color;',
        'varying vec4 vColor;',
        'void main() {',
        'vUv = uv;',
        'vColor = color;',
        'gl_PointSize = 1.0;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
      ].join('\n'),
      fragmentShader: this.fragmentShader,
      side: THREE.DoubleSide,
      transparent: true
    };

    const material = new THREE.ShaderMaterial(ParamsShaderMaterial);
    const mesh = new THREE.Mesh(geometry, material);

    camera.position.z = 4;
    scene.add(mesh);
    renderer.setClearColor('#000000');
    renderer.setClearAlpha(0.0);
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.mesh = mesh;

  }

  shouldComponentUpdate(nextProps: Props, nextState: {}) {
    let k = this.props.value.koyomi;
    let time = K.time(k);
    if (K.time(nextProps.value.koyomi) === K.time(this.props.value.koyomi)) {
      return false;
    } else {
      return true;
    }
  }
  componentDidMount() {

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.renderer.setSize(width, height);

    if (this.mount !== null) {
      this.mount.appendChild(this.renderer.domElement);
    }
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    if (this.mount !== null) {

      this.mount.removeChild(this.renderer.domElement);
    }
  }

  start() {
    if (!this.frameId) {
      //this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    //this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.01;
    let k = this.props.value.koyomi;
    let t = K.saw(k, 0.5);
    this.mesh.rotation.z = t * Math.PI * 2;

    this.renderScene();
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {

    let w = 50;
    let h = 50;
    let k = this.props.value.koyomi;
    let time = K.time(k);
    this.material.uniforms.time.value = K.saw(k, 1);
    let ee = this.material.uniforms.time.value;
    let t = ee.toString();

    // let cc = React.Children.map(this.props.children, (child: ReactChild, index: number) => { return child; });
    // this.frameId = window.requestAnimationFrame(this.animate);
    // this.material.uniforms.tex.value = this.texture;
    this.animate();
    return (
      <div
        style={{
          width: w, height: h,
          margin: '0px', alignContent: 'center',
        }}
        ref={(mount) => {
          if (mount !== null) {
            this.mount = mount;
          }
        }
        }
      >

      </div>
    );
  }
}
