import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function ChevronDown({color, size, style}) {
  return (
    <Svg
      style={style}
      width={size}
      height={0.5 * size}
      viewBox="0 0 42 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M1 1l19.79 20L41 1" stroke={color} strokeWidth={4} />
    </Svg>
  );
}