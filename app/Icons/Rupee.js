import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Rupee({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(24 * size) / 15}
      viewBox="0 0 15 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M7.5 22l-5.756-5.756c-.09-.09-.02-.246.107-.25C11.5 15.67 11.381 2 1.5 2h12M1.5 9h12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
