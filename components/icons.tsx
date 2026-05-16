'use client';

import React from 'react';

type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

function ic(
  size: number,
  strokeWidth: number,
  className: string,
  children: React.ReactNode
): React.ReactElement {
  return React.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
      className: className || '',
    },
    children
  );
}

export function Icon({ name, size = 20, strokeWidth = 1.75, className = '' }: IconProps) {
  const p = (d: string, k?: string) => <path key={k ?? d} d={d} />;
  const c = (cx: number, cy: number, r: number, k?: string) => (
    <circle key={k ?? `${cx}${cy}${r}`} cx={cx} cy={cy} r={r} />
  );
  const l = (x1: number, y1: number, x2: number, y2: number, k?: string) => (
    <line key={k ?? `${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
  );

  switch (name) {
    case 'search':
      return ic(size, strokeWidth, className, [c(11, 11, 7, 'c'), p('m21 21-4.3-4.3', 'p')]);
    case 'compass':
      return ic(size, strokeWidth, className, [
        c(12, 12, 10, 'c'),
        p('m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z', 'p'),
      ]);
    case 'package':
      return ic(size, strokeWidth, className, [
        p('m7.5 4.27 9 5.15', 'p1'),
        p('M21 8.5v7a2 2 0 0 1-1 1.74l-7 3.99a2 2 0 0 1-2 0l-7-3.99A2 2 0 0 1 3 15.5v-7a2 2 0 0 1 1-1.74l7-3.99a2 2 0 0 1 2 0l7 3.99A2 2 0 0 1 21 8.5z', 'p2'),
        p('M3.27 6.96 12 12.01l8.73-5.05', 'p3'),
        l(12, 22.08, 12, 12, 'l'),
      ]);
    case 'repeat':
      return ic(size, strokeWidth, className, [
        p('m17 2 4 4-4 4', 'a'),
        p('M3 11v-1a4 4 0 0 1 4-4h14', 'b'),
        p('m7 22-4-4 4-4', 'c'),
        p('M21 13v1a4 4 0 0 1-4 4H3', 'd'),
      ]);
    case 'sparkles':
      return ic(size, strokeWidth, className, [
        p('M9.94 14.07 8.5 18l-1.44-3.93L3.13 12.6l3.93-1.44L8.5 7.23l1.44 3.93 3.93 1.44z', 'a'),
        p('M18.5 3v4', 'b'),
        p('M16.5 5h4', 'c'),
        p('M18.5 17v4', 'd'),
        p('M16.5 19h4', 'e'),
      ]);
    case 'target':
      return ic(size, strokeWidth, className, [c(12, 12, 10, 'a'), c(12, 12, 6, 'b'), c(12, 12, 2, 'c')]);
    case 'activity':
      return ic(size, strokeWidth, className, [
        p('M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.5.5 0 0 1-.96 0L9.24 3.18a.5.5 0 0 0-.96 0l-2.35 8.36A2 2 0 0 1 4 13H2'),
      ]);
    case 'key':
      return ic(size, strokeWidth, className, [
        c(7.5, 15.5, 5.5, 'a'),
        p('m21 2-9.6 9.6', 'b'),
        p('m15.5 7.5 3 3L22 7l-3-3', 'c'),
      ]);
    case 'users':
      return ic(size, strokeWidth, className, [
        p('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'a'),
        c(9, 7, 4, 'b'),
        p('M22 21v-2a4 4 0 0 0-3-3.87', 'c'),
        p('M16 3.13a4 4 0 0 1 0 7.75', 'd'),
      ]);
    case 'clock':
      return ic(size, strokeWidth, className, [c(12, 12, 10, 'a'), p('M12 6v6l4 2', 'b')]);
    case 'shield':
      return ic(size, strokeWidth, className, [
        p('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'),
      ]);
    case 'check-circle':
      return ic(size, strokeWidth, className, [
        p('M22 11.08V12a10 10 0 1 1-5.93-9.14', 'a'),
        p('m9 11 3 3L22 4', 'b'),
      ]);
    case 'arrow-right':
      return ic(size, strokeWidth, className, [l(5, 12, 19, 12, 'a'), p('m12 5 7 7-7 7', 'b')]);
    case 'arrow-up-right':
      return ic(size, strokeWidth, className, [l(7, 17, 17, 7, 'a'), p('M7 7h10v10', 'b')]);
    case 'menu':
      return ic(size, strokeWidth, className, [l(3, 6, 21, 6, 'a'), l(3, 12, 21, 12, 'b'), l(3, 18, 21, 18, 'c')]);
    case 'x':
      return ic(size, strokeWidth, className, [l(18, 6, 6, 18, 'a'), l(6, 6, 18, 18, 'b')]);
    case 'chevron-right':
      return ic(size, strokeWidth, className, [p('m9 18 6-6-6-6')]);
    case 'chevron-down':
      return ic(size, strokeWidth, className, [p('m6 9 6 6 6-6')]);
    case 'minus':
      return ic(size, strokeWidth, className, [l(5, 12, 19, 12, 'a')]);
    case 'plus':
      return ic(size, strokeWidth, className, [l(12, 5, 12, 19, 'a'), l(5, 12, 19, 12, 'b')]);
    case 'dot':
      return ic(size, strokeWidth, className, [c(12, 12, 2.5, 'a')]);
    case 'mail':
      return ic(size, strokeWidth, className, [
        p('M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'a'),
        p('m22 6-10 7L2 6', 'b'),
      ]);
    case 'bot':
      return ic(size, strokeWidth, className, [
        p('M12 8V4H8', 'a'),
        p('M16 8H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z', 'b'),
        l(2, 14, 2, 18, 'c'),
        l(22, 14, 22, 18, 'd'),
        p('M9 13v2', 'e'),
        p('M15 13v2', 'f'),
      ]);
    case 'globe':
      return ic(size, strokeWidth, className, [
        c(12, 12, 10, 'a'),
        p('M2 12h20', 'b'),
        p('M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z', 'c'),
      ]);
    case 'corner-down-right':
      return ic(size, strokeWidth, className, [p('m15 10 5 5-5 5', 'a'), p('M4 4v7a4 4 0 0 0 4 4h12', 'b')]);
    case 'linkedin':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 134 134"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M29.7813 133.048H2.19766V44.2185H29.7813V133.048ZM15.9746 32.1014C7.15428 32.1014 0 24.7955 0 15.975C6.31322e-08 11.7382 1.68304 7.67485 4.67886 4.67896C7.67468 1.68307 11.7379 0 15.9746 0C20.2114 0 24.2746 1.68307 27.2704 4.67896C30.2662 7.67485 31.9492 11.7382 31.9492 15.975C31.9492 24.7955 24.792 32.1014 15.9746 32.1014ZM133.018 133.048H105.494V89.8062C105.494 79.5007 105.286 66.2847 91.1525 66.2847C76.8112 66.2847 74.6136 77.4812 74.6136 89.0637V133.048H47.0597V44.2185H73.5147V56.3356H73.9008C77.5834 49.3564 86.579 41.9911 99.9995 41.9911C127.916 41.9911 133.048 60.3747 133.048 84.2525V133.048H133.018Z" />
        </svg>
      );
    default:
      return ic(size, strokeWidth, className, [c(12, 12, 9, 'a')]);
  }
}
