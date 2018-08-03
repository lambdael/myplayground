export interface Koyomi {
  BPM: number;
  startTime: number;
  currentTime: number;
  state: PlayState;
  playngTime: number;
}
export enum PlayState {
  playing,
  pause,
}
export const initialState: Koyomi = {
  BPM: 80.0,
  currentTime: 0,
  startTime: 0,
  state: PlayState.pause,
  playngTime: 0,
};

export function time(k: Koyomi) {
  return k.playngTime;
}
export function colorBW(c: number) {
  let cc = Math.ceil(0xFF * c).toString(16);
  return '#' + cc + cc + cc;
}

export function colorBWA(c: number) {
  let cc = Math.ceil(0xFF * c).toString(16);
  return '#' + cc + cc + cc + cc;
}
export function saw(k: Koyomi, beatPerBar: number = 4) {
  return 1.0 - ramp(k, beatPerBar);
}
export function beat(k: Koyomi, beatPerBar: number = 4) {
  return (60.0) / (k.BPM * beatPerBar / 4);
}
export function bar(k: Koyomi) {
  return beat(k, 1);
}
export function barpos(k: Koyomi, barnum: number = 1) {
  let beat = Math.floor(time(k) / (bar(k) * barnum));
  return beat;
}
export function beatpos(k: Koyomi, beatPerBar: number = 4) {
  let beat = Math.floor(ramp(k, 1) * beatPerBar);
  return beat;
}
export function sixteenpos(k: Koyomi) {
  let beat = Math.floor(ramp(k, 1) * 16) % 4;
  return beat;
}
export function ramp(k: Koyomi, beatPerBar: number = 4) {
  let b = beat(k, beatPerBar);
  let mod = (time(k) % b) / b;
  return mod;
}
