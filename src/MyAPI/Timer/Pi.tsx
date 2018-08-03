import * as React from 'react';
export function Pi(props: { radian: number }) {
  let rgbaF = [0.8, 0.5, 0.9, 1.0];

  let rad = props.radian;
  let size = 50;
  let p = {
    x: size * (Math.sin(rad * 2.0 * Math.PI) + 1.0) / 2.0,
    y: size * (1.0 - ((Math.cos(rad * 2.0 * Math.PI) + 1.0) / 2.0)),
  };
  let start = { x: size / 2.0, y: 0 };
  let center = { x: size / 2.0, y: size / 2.0 };
  let po = {
    largeArcFlag: 1, sweepFlag: 1,
  };

  if (rad < 1.0 / 4.0) {
    po = {
      largeArcFlag: 0, sweepFlag: 1,
    };
  } else if (rad < 2.0 / 4.0) {
    po = {
      largeArcFlag: 0, sweepFlag: 1,
    };
  } else if (rad < 3.0 / 4.0) {
    po = {
      largeArcFlag: 1, sweepFlag: 1,
    };
  } else if (rad < 4.0 / 4.0) {
    po = {
      largeArcFlag: 1, sweepFlag: 1,
    };
  } else {
    po = {
      largeArcFlag: 1, sweepFlag: 1,
    };
  }
  let mss = 'M ' + start.x + ' ' + start.y + ' ';
  let ass = 'A ' + center.x + ' ' + center.y + ', 0, ';
  let fss = po.largeArcFlag + ', ' + po.sweepFlag + ', ';
  let pss = p.x + ' ' + p.y + '  L ' + center.x + ' ' + center.y + ' Z';
  let ss = mss + ass + fss + pss;
  return (
    <span>
      <svg width={size} height={size} version='1.1' xmlns='http://www.w3.org/2000/svg'>

        <path d={ss} fill='purple' />

      </svg>
    </span>
  );
}
