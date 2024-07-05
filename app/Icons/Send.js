import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Send({color, size, style}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <Path
        d="M22.223 11.111L2.735 1.368C1.87.935.957 1.86 1.4 2.719l3.646 7.09a1 1 0 00.69.522l3.386.69c1.067.216 1.067 1.742 0 1.959l-3.371.686a1 1 0 00-.701.544L1.6 21.333c-.417.862.499 1.76 1.352 1.328l19.275-9.763a1 1 0 00-.004-1.787z"
        fill={color}
      />
    </Svg>
  );
}

export default Send;
