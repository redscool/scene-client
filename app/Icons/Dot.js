import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

export default function Dot({color, size, style}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Circle cx={4} cy={4} r={4} fill={color} />
    </Svg>
  );
}
