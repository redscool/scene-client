import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Email({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(22 * size) / 28}
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M2.428 3.857l8.858 6.643a4.286 4.286 0 005.143 0l8.857-6.643"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.857 1h-20A2.857 2.857 0 001 3.857v14.286A2.857 2.857 0 003.857 21h20a2.857 2.857 0 002.857-2.857V3.857A2.857 2.857 0 0023.857 1z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
