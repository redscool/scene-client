import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Location({color, size, style}) {
  return (
    <Svg
      style={style}
      width={size}
      height={1.39 * size}
      viewBox="0 0 23 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11.104 0C4.981 0 0 4.982 0 11.105 0 17 10.075 30.77 10.504 31.354l.4.544a.248.248 0 00.402 0l.4-.544C12.135 30.77 22.21 17 22.21 11.105 22.21 4.982 17.228 0 11.104 0zm0 7.127a3.982 3.982 0 013.979 3.978 3.983 3.983 0 01-3.979 3.978 3.983 3.983 0 01-3.977-3.978 3.983 3.983 0 013.978-3.978z"
        fill={color}
      />
    </Svg>
  );
}
