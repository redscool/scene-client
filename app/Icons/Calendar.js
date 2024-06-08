import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Calendar({color, size, style}) {
  return (
    <Svg
      width={size}
      height={1.1 * size}
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M17 3H3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM14 1v4M6 1v4M1 9h18"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
