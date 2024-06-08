import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Timer({color, size, style}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM2.19 12c0 5.418 4.392 9.81 9.81 9.81s9.81-4.392 9.81-9.81S17.419 2.19 12 2.19 2.19 6.581 2.19 12z"
        fill={color}
      />
      <Path
        d="M12 4.364a1.09 1.09 0 00-1.09 1.09v7.055s0 .284.137.498c.093.182.237.34.427.449l5.04 2.91a1.09 1.09 0 001.09-1.89l-4.513-2.606V5.454a1.09 1.09 0 00-1.09-1.09z"
        fill={color}
      />
    </Svg>
  );
}
