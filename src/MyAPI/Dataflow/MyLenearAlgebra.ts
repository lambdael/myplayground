import * as la from 'maths.ts';

export type MySVGMatrix = { a: number, b: number, c: number, d: number, e: number, f: number };
export type point = { x: number, y: number };
export function toSVGString(m: MySVGMatrix) {
  return 'matrix(' +
    m.a + ' ' + m.b + ' ' + m.c + ' ' + m.d + ' ' + m.e + ' ' + m.f +
    ') ';
}
function threeTotwoD(ms: la.structures.Matrix): MySVGMatrix {
  let m = ms.numberMatrix;
  let a = m[0][0],
    b = m[1][1],
    c = 0,
    d = 0,
    e = m[0][3],
    f = m[1][3]
    ;
  return { a: a, c: c, e: e, b: b, d: d, f: f };
}
export function PxM(p: point, m: MySVGMatrix): point {
  return {
    x: p.x * m.a + p.y * m.c + m.e,
    y: p.y * m.b + p.y * m.d + m.f,
  };
}
export function MxM(m1: MySVGMatrix, m2: MySVGMatrix): MySVGMatrix {
  let mat1 = new la.structures.Matrix([[m1.a, m1.c, m1.e], [m1.b, m1.d, m1.f], [0, 0, 1]]);
  let mat2 = new la.structures.Matrix([[m2.a, m2.c, m2.e], [m2.b, m2.d, m2.f], [0, 0, 1]]);
  let matR = mat1.multiply(mat2);
  let m = matR.numberMatrix;
  return {
    a: m[0][0], c: m[0][1], e: m[0][2],
    b: m[1][0], d: m[1][1], f: m[1][2],
  };
}

export const ident: MySVGMatrix = {
  a: 1, b: 0, c: 0,
  d: 1, e: 0, f: 0
};

export function Scale(x: number, y: number) {
  return {
    a: x, b: 0, c: 0,
    d: y, e: 0, f: 0
  };
}
export function Translate(x: number, y: number) {
  return {
    a: 1, b: 0, c: 0,
    d: 1, e: x, f: y
  };
}
export function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}