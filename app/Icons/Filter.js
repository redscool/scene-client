import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Filter({color, size, style}) {
  return (
    <Svg
      width={size}
      height={0.793 * size}
      viewBox="0 0 29 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M1 6h27M1 6l3.984-5M28 17H1M24.016 22L28 17"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}
