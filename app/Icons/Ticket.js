import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Ticket({color, size, style}) {
  return (
    <Svg
      width={size}
      height={(10 * size) / 7}
      viewBox="0 0 21 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M19.61 26.851V3.149a1.353 1.353 0 00-2.105-1.126l-2.148 1.432a1.353 1.353 0 01-1.596-.07l-2.61-2.088a1.354 1.354 0 00-1.692 0L6.848 3.385a1.353 1.353 0 01-1.596.07L3.104 2.023C2.204 1.423 1 2.068 1 3.149v23.702a1.353 1.353 0 002.104 1.126l2.148-1.432a1.353 1.353 0 011.596.07l2.611 2.088a1.354 1.354 0 001.691 0l2.611-2.088a1.353 1.353 0 011.596-.07l2.148 1.432c.9.6 2.104-.045 2.104-1.126z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M6.075 10.77h8.459M6.075 15h8.459M6.075 19.23h8.459"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
