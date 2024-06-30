import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Back({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(17 * size) / 22}
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M1 8.5h20M1 8.5L6.5 1M1 8.5L6.5 16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
