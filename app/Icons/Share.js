import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Share({color, size, style}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width={`${size}px`}
      height={`${size}px`}
      style={style}>
      <Path
        d="M23 3a4 4 0 00-4 4 4 4 0 00.094.836l-9.082 4.541A4 4 0 007 11a4 4 0 00-4 4 4 4 0 004 4 4 4 0 003.014-1.375l9.076 4.54A4 4 0 0019 23a4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4 4 4 0 00-3.014 1.375l-9.076-4.54A4 4 0 0011 15a4 4 0 00-.094-.834l9.082-4.541A4 4 0 0023 11a4 4 0 004-4 4 4 0 00-4-4z"
        fill={color}
      />
    </Svg>
  );
}
