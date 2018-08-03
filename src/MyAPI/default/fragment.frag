varying vec2 vUv;
precision mediump float;
uniform float time;
uniform sampler2D uTex;
varying vec4 vColor;
const float PI = 3.14;
vec4 ripple (float t,vec2 p){
  return vec4(cos(p.x+t),sin(p.y+t),cos(p.y+t),1);
}
float norm (float p){
  return (p/2.0  + 0.5);
}
void main() {
  //vec2 uv = vUv;
  float t = sin(time*PI*2.0) ;
  vec4 c = texture2D( uTex ,vUv  );
  gl_FragColor =  vec4(c.r+t,c.g+t,c.b+t,c.a*t);
}
