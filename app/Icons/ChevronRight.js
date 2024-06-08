import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function ChevronRight({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(size * 34) / 18}
      viewBox="0 0 18 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M1 33l16-15.832L1 1"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
