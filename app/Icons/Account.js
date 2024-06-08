import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export default function Account({color, size, style}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Circle
        cx={12}
        cy={6}
        r={5}
        fill={color}
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M23 23H1c0-4.955 4.537-10.01 13.295-8.826C21.3 15.121 23.017 20.453 23 23z"
        fill={color}
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
}
